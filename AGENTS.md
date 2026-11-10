# Architecture rules

- Read notification secrets from request-scoped native Cloudflare bindings, not process.env, so dashboard production secrets work with the Nitro Worker adapter.
- Persist form submissions before emailing submitted non-attachment answers as plain text to the fixed clinic recipient; validate Reply-To and track acceptance separately without logging patient payloads.
- Deduplicate form retries with per-submission request keys and Resend idempotency keys; private notification state remains service-role-only.