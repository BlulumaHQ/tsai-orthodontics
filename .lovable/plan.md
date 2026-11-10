# Production forms on the external Cloudflare Worker

## Answers

**1. Service role key:** No. Lovable Cloud does not expose `SUPABASE_SERVICE_ROLE_KEY` (or the DB password) anywhere in the UI, and it cannot be retrieved for use outside Lovable. The external Worker has to work without it.

**2. Smallest secure alternative:** Use gated `SECURITY DEFINER` database functions, called with the publishable key over PostgREST. Each one checks a shared secret before doing any work.
- Store a hash of a new secret `FORM_GATEWAY_SECRET` in a private config table. Only `service_role` can read it. A SQL check compares `extensions.digest(p_secret,'sha256')` against the stored hash.
- New RPCs. Each one is `SECURITY DEFINER`, uses `search_path = public`, and has `EXECUTE` granted to `anon` only. Each one returns NULL or raises an error if the secret does not match:
  - `form_gateway_rate_limit(p_secret, p_key, p_limit) -> boolean` wraps the existing `consume_form_submission_rate_limit`.
  - `form_gateway_insert(p_secret, p_type, p_payload jsonb, p_request_key) -> uuid` keeps idempotency. It inserts with `ON CONFLICT (request_key) DO NOTHING`, then returns the existing id.
  - `form_gateway_claim(p_secret, p_type, p_id) -> jsonb` does an atomic `pending|failed -> sending` update. It returns `{claimed, payload, status}`. The payload goes back only on a successful claim, so the server can render the email.
  - `form_gateway_finish(p_secret, p_type, p_id, p_status, p_provider_id, p_error_code, p_http_status)` writes the final status. It only accepts the values `sent` or `failed`.
- `p_type` maps to a fixed list of tables inside the function, never to dynamic SQL. Tables stay RLS-locked to `service_role`, and anon has no direct table access.
- Route changes: add `src/lib/forms/submission-store.server.ts` with the same four operations. It uses the admin client when `SUPABASE_SERVICE_ROLE_KEY` is set (Lovable hosting). Otherwise it uses a publishable-key client plus `FORM_GATEWAY_SECRET` (external Worker). `$type.ts` calls this module instead of `supabaseAdmin` directly. All other behaviour stays the same: validation, honeypot, 429/503 responses, saved vs. notification status, Resend idempotency.
- The publishable client is built per request from Worker bindings (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`) via `getWorkerSecret`, with `persistSession:false`.
- Setting the secret hash: I generate the secret in Lovable with `generate_secret`. A one-time migration step can't read the plaintext. So instead, you create the value yourself (for example `openssl rand -hex 32`). You save it as the Worker secret, and also give it to me in Project Settings → Secrets as `FORM_GATEWAY_SECRET`. I then store only its SHA-256 hash in the DB through the SQL tool. The same value has to exist in both places.

**3. Rate-limit key:** `rateLimitKey` uses `getWorkerSecret(request,"FORM_RATE_LIMIT_SECRET") ?? getWorkerSecret(request,"LOVABLE_API_KEY") ?? process.env.LOVABLE_API_KEY`. If none are set, it returns 503 as it does now. Tests cover preferred, fallback, and missing.

**4. Final Cloudflare Worker settings for "tsai-orthodontics":**
| Name | Type | Value |
|---|---|---|
| `RESEND_API_KEY` | Secret | already set |
| `FORM_GATEWAY_SECRET` | Secret | the random value created in step 2 |
| `FORM_RATE_LIMIT_SECRET` | Secret | a separate random value (32+ bytes) |
| `SUPABASE_URL` | Var | the project's backend URL (public) |
| `SUPABASE_PUBLISHABLE_KEY` | Var | the publishable key (public, already in the code) |

`LOVABLE_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are not needed on the Worker.

## Steps
1. Migration: config table, the four gateway RPCs, and grants (revoke from public/authenticated; grant execute to anon).
2. Add `submission-store.server.ts` (admin or gateway backend) and refactor `$type.ts` to use it. Update `rateLimitKey`.
3. Tests: gateway client with mocked fetch (correct RPC names and args, secret sent), missing-secret 503, rate-limit secret fallback, existing notification tests.
4. Seed the secret hash after you add `FORM_GATEWAY_SECRET`. Typecheck, run tests, and update `FORM_EMAIL_INTEGRATION.md` and `AGENTS.md`.
5. You then set the Worker secrets/vars and redeploy through Cloudflare Builds, then run one controlled synthetic submission. I won't claim production works until that test passes.
