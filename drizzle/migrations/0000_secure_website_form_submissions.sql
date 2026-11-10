CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL
);
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.patient_intake_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL
);
GRANT ALL ON public.patient_intake_submissions TO service_role;
ALTER TABLE public.patient_intake_submissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.dentist_referral_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL
);
GRANT ALL ON public.dentist_referral_submissions TO service_role;
ALTER TABLE public.dentist_referral_submissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.form_submission_rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.form_submission_rate_limits TO service_role;
ALTER TABLE public.form_submission_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_form_submission_rate_limit(
  p_key text,
  p_limit integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_count integer;
BEGIN
  INSERT INTO public.form_submission_rate_limits (key, window_start, request_count)
  VALUES (p_key, date_trunc('hour', now()), 1)
  ON CONFLICT (key) DO UPDATE
  SET
    request_count = CASE
      WHEN public.form_submission_rate_limits.window_start = date_trunc('hour', now())
        THEN public.form_submission_rate_limits.request_count + 1
      ELSE 1
    END,
    window_start = date_trunc('hour', now()),
    updated_at = now()
  RETURNING request_count INTO current_count;

  RETURN current_count <= p_limit;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_form_submission_rate_limit(text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_form_submission_rate_limit(text, integer) FROM anon;
REVOKE ALL ON FUNCTION public.consume_form_submission_rate_limit(text, integer) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.consume_form_submission_rate_limit(text, integer) TO service_role;