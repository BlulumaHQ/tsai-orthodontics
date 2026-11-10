# Architecture rules

- Read notification secrets from request-scoped native Cloudflare bindings, not process.env, so dashboard production secrets work with the Nitro Worker adapter.
- Persist form submissions before sending generic owner notifications; track notification acceptance separately and never include patient payloads in email or logs.
- Deduplicate form retries with per-submission request keys and Resend idempotency keys; private notification state remains service-role-only.