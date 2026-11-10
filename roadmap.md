# Production maintenance

- [x] Correct clinic emails to include submitted form details and validated Reply-To; 52 mocked/validation/domain tests, type checking, and targeted lint passed. No pages changed or real email sent.
- [x] Audit every contact and consultation submission path, backend handling, secrets, sender setup, and delivery logs.
- [x] Integrate direct Resend notifications for all three stored forms using native production Worker bindings, sanitized status tracking, and retry deduplication.
- [x] Test mocked sends, missing secrets, provider failures, and unchanged submission validation; 45 tests, type check, targeted lint, and automatic build pass. Synthetic route checks confirm saved records, secret_missing tracking, and retry deduplication.
- [x] Proofread all public-facing English pages and correct only clear textual errors.
- [x] Verify all three preview forms, stored rows, validation, English copy, build, tests, and security checks; remove synthetic rows.
- [ ] Deploy through the actual production Cloudflare Worker and verify controlled synthetic email receipt; no production deployment credentials/tool are available here, and clinic receipt requires user verification. No real email was sent.
- [x] Commit all changes for this request.
