CREATE TABLE public.form_gateway_config (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  secret_sha256 bytea NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.form_gateway_config TO service_role;
ALTER TABLE public.form_gateway_config ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.form_gateway_check(p_secret text)
RETURNS void LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF p_secret IS NULL OR length(p_secret) < 32 OR NOT EXISTS (
    SELECT 1 FROM public.form_gateway_config
    WHERE secret_sha256 = sha256(convert_to(p_secret, 'UTF8'))
  ) THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;
END; $$;

CREATE OR REPLACE FUNCTION public.form_gateway_table(p_type text)
RETURNS text LANGUAGE plpgsql IMMUTABLE SET search_path = '' AS $$
BEGIN
  RETURN CASE p_type
    WHEN 'consultation' THEN 'consultation_requests'
    WHEN 'patient-intake' THEN 'patient_intake_submissions'
    WHEN 'dentist-referral' THEN 'dentist_referral_submissions'
    ELSE NULL END;
END; $$;

CREATE OR REPLACE FUNCTION public.form_gateway_rate_limit(p_secret text, p_key text, p_limit integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  PERFORM public.form_gateway_check(p_secret);
  RETURN public.consume_form_submission_rate_limit(p_key, p_limit);
END; $$;

CREATE OR REPLACE FUNCTION public.form_gateway_insert(p_secret text, p_type text, p_payload jsonb, p_request_key uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE t text; new_id uuid;
BEGIN
  PERFORM public.form_gateway_check(p_secret);
  t := public.form_gateway_table(p_type);
  IF t IS NULL THEN RAISE EXCEPTION 'invalid type' USING ERRCODE = '22023'; END IF;
  IF p_request_key IS NOT NULL THEN
    EXECUTE format('SELECT id FROM public.%I WHERE request_key = $1', t) INTO new_id USING p_request_key;
    IF new_id IS NOT NULL THEN RETURN new_id; END IF;
  END IF;
  EXECUTE format('INSERT INTO public.%I (payload, request_key, notification_status) VALUES ($1, $2, ''pending'') ON CONFLICT (request_key) DO NOTHING RETURNING id', t)
    INTO new_id USING p_payload, p_request_key;
  IF new_id IS NULL THEN
    EXECUTE format('SELECT id FROM public.%I WHERE request_key = $1', t) INTO new_id USING p_request_key;
  END IF;
  RETURN new_id;
END; $$;

CREATE OR REPLACE FUNCTION public.form_gateway_claim(p_secret text, p_type text, p_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE t text; p jsonb; s text;
BEGIN
  PERFORM public.form_gateway_check(p_secret);
  t := public.form_gateway_table(p_type);
  IF t IS NULL THEN RAISE EXCEPTION 'invalid type' USING ERRCODE = '22023'; END IF;
  EXECUTE format('UPDATE public.%I SET notification_status = ''sending'', notification_attempted_at = now() WHERE id = $1 AND notification_status IN (''pending'',''failed'') RETURNING payload', t)
    INTO p USING p_id;
  IF p IS NOT NULL THEN RETURN jsonb_build_object('claimed', true, 'payload', p); END IF;
  EXECUTE format('SELECT notification_status FROM public.%I WHERE id = $1', t) INTO s USING p_id;
  RETURN jsonb_build_object('claimed', false, 'status', s);
END; $$;

CREATE OR REPLACE FUNCTION public.form_gateway_finish(p_secret text, p_type text, p_id uuid, p_status text, p_provider_id text, p_error_code text, p_http_status integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE t text;
BEGIN
  PERFORM public.form_gateway_check(p_secret);
  t := public.form_gateway_table(p_type);
  IF t IS NULL OR p_status NOT IN ('sent','failed') THEN RAISE EXCEPTION 'invalid input' USING ERRCODE = '22023'; END IF;
  EXECUTE format('UPDATE public.%I SET notification_status = $2, notification_provider_id = $3, notification_error_code = left($4, 100), notification_http_status = $5 WHERE id = $1', t)
    USING p_id, p_status, CASE WHEN p_status = 'sent' THEN left(p_provider_id, 200) END, CASE WHEN p_status = 'failed' THEN p_error_code END, CASE WHEN p_status = 'failed' THEN p_http_status END;
END; $$;

REVOKE ALL ON FUNCTION public.form_gateway_check(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.form_gateway_table(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.form_gateway_rate_limit(text, text, integer) FROM PUBLIC, authenticated;
REVOKE ALL ON FUNCTION public.form_gateway_insert(text, text, jsonb, uuid) FROM PUBLIC, authenticated;
REVOKE ALL ON FUNCTION public.form_gateway_claim(text, text, uuid) FROM PUBLIC, authenticated;
REVOKE ALL ON FUNCTION public.form_gateway_finish(text, text, uuid, text, text, text, integer) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.form_gateway_rate_limit(text, text, integer) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.form_gateway_insert(text, text, jsonb, uuid) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.form_gateway_claim(text, text, uuid) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.form_gateway_finish(text, text, uuid, text, text, text, integer) TO anon, service_role;