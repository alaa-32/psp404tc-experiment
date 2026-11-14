# Development versus production collection

`.env.development` and `.env.production` both default to preview (collection off). Development keeps the accurate browser-only consent notice. Production must not replace that notice with remote-storage claims until the actual service and wording are verified. Live sessions use a separate storage namespace; preview, forced-researcher and explicitly synthetic records cannot be submitted by the participant adapter.

Automatic submission after task eight, acknowledgment checking, retry, stable session IDs, emergency JSON backup and local persistence are implemented. Mock tests validate contracts; they do not verify real inbox delivery. FormSubmit.app does not provide a documented idempotency guarantee: retries after uncertain network failures may duplicate records; deduplicate by participant ID offline. A custom receiver must enforce uniqueness by submission_id. Local backups are not automatically deleted, even after acknowledgment.

## Account configuration and verification

1. Researcher configures the receiving form and verified recipient account, allowed study origin, quota, storage/retention and compatible spam protection. No private API credentials belong in Vite variables. See SUBMISSION.md for the provider contract and limitations.
2. With authorization, conduct a separate, clearly labeled synthetic pilot against a dedicated test form/receiver. Verify the intended inbox, full eight-trial content, export, CORS, retry handling and quota behavior. Do not use forced researcher sessions as genuine participant submissions. Confirm the final receiver settings before recording verification.
3. Record the exact endpoint, provider, test date and non-sensitive receipt reference in `src/data/submission-verification.json`; set confirmed only when actual receipt has been checked. Keep raw receipts private. This file records researcher attestation, not automatic proof of delivery.
4. In `src/data/consent.json`, supply approved contact, recipient/access, retention, withdrawal procedure and complete English/Chinese `remoteText` reflecting the actual arrangements. Address any provider request/IP logs and limits to anonymous withdrawal. Set approved only after review. No contact or privacy guarantees have been invented; these fields remain empty.
5. Correct EC2 and complete all scientific/materials, rights, real-phone, China-network, course and release approvals. Physical Android/iPhone testing on campus Wi-Fi and mobile data without VPN remains required.

## Deploy only after explicit owner approval

1. Review repository contents; exclude private_materials, local-assets, qa, research-data, keys and unapproved scans. Only rights-cleared evidence belongs in public assets.
2. Push the reviewed source to your GitHub repository. Settings → Pages → Source: GitHub Actions.
3. Set repository variable `SUBMISSION_ENDPOINT` to the verified public form endpoint. Existing manual workflow selects `formsubmit-app`; change provider only after contract testing. Its live environment must match the verification record exactly.
4. Run `pnpm test`, Python analysis tests, `pnpm check:live` with the configured endpoint/provider available, then `pnpm build`. `.env.production.local` can contain public endpoint/provider and `VITE_COLLECTION_MODE=live` for a local release build. No secrets. Build validation reads Vite production configuration and environment overrides.
5. When all gates pass and the owner has approved release, manually run “Publish approved experiment” with input `APPROVED`. The workflow tests, validates and publishes only dist. Relative assets support GitHub Pages project subpaths.
6. Verify the published URL and actual receiver on real phones/networks before recruitment. Do not treat API acknowledgment alone as proof of email delivery.

Current state: no receiving endpoint, no verified real delivery, remote privacy text blank/unapproved, EC2 blocked, owner release false. A preview build is permitted; a live release must fail. Nothing has been deployed or activated.
