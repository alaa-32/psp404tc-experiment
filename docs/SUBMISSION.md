# Submission adapter and pilot checklist

No endpoint is configured or contacted. Preview never submits. FormSubmit.app is implemented from its official documentation; live browser CORS, inbox delivery, export shape and China connectivity are NOT VERIFIED.

As checked on 2026-11-10, the [free plan](https://formsubmit.app/pricing) lists 50 submissions/month. For 30–40 participants, budget pilot and retry traffic carefully. Their endpoint can acknowledge over-quota submissions while access/email is locked; API success is not proof of inbox delivery.

The [endpoint reference](https://formsubmit.app/docs/endpoint) documents JSON POST to `https://formsubmit.app/f/{formId}`, OPTIONS/CORS support and `{ok:true,id:"..."}` acknowledgment. The app sends `submission_id` plus one `session_json` string. A nonempty returned ID is required; null IDs (non-storage or honeypot outcomes) do not count as saved. No private token is used. A public form ID is not a secret. Each value is limited to 100,000 characters; the adapter rejects oversized payloads rather than silently truncate data.

After owner authorization to configure collection:

1. Researcher creates a free form and verifies the recipient email themselves. Configure allowlisted study origin, approved retention and privacy settings. See [security/privacy](https://formsubmit.app/docs/security-privacy). Provider infrastructure may log IPs and other request metadata even though the app does not collect them; account for that in consent/privacy review.
2. Use no Google-dependent captcha. The app does not implement captcha tokens; if provider settings demand a captcha, submissions fail and remain locally recoverable. Choose approved compatible spam protection or extend/test a non-Google captcha before release.
3. Set `VITE_SUBMISSION_PROVIDER=formsubmit-app` and the public endpoint. Keep `VITE_COLLECTION_MODE=preview` until release gates pass. Test the real contract separately using clearly synthetic pilot data only after authorization.
4. Check the provider record and intended inbox; download/export and run offline scoring. Confirm retry data carries the same participant ID. There is no documented provider-side idempotency guarantee: an uncertain network timeout may create duplicate emails. The UI prevents concurrent requests and repeats after acknowledged success; the offline tool removes identical duplicates and rejects conflicting copies.
5. Review quota and delivery during recruitment. Never rely on only the browser's local storage. Download backups on failure and keep a secured researcher archive.

Custom provider option: use `VITE_SUBMISSION_PROVIDER=custom`. It must accept a JSON session with `submission_id`, support CORS and return HTTP 2xx with `{ "accepted": true, "submission_id": "the-exact-participant-id" }` only after durable storage. Implement server-side uniqueness by ID. This is a contract for a custom receiver, not an assertion that an arbitrary form service supports it.

No external accounts were created, emails sent, remote test submissions made, or collection activated.
