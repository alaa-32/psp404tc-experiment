# Authorized synthetic pilot

Endpoint: https://formsubmit.app/f/rrr95n9ge3

One synthetic session was accepted, after an initial sandbox connection denial (EACCES, no request reached the server). The same saved payload/session ID was used once network access was granted. No automatic retry was made after acknowledgment.

- Session/participant ID: `SYNTHETIC-TEST-51ccc071-95c9-496c-ade8-33531fdf3a58`
- Label: `SYNTHETIC TEST ONLY — NOT A RESEARCH PARTICIPANT`
- HTTP status: 200
- Provider acknowledgment: `{"ok":true,"id":"okbUQGVUFzA5neBE","message":"Thanks! Your submission has been received."}`
- Payload: one structured submission with session_json containing eight trial records, order, seed, group B, language en, millisecond timing and source events. Top-level participant_id, session_id, submission_id, group and language are also included.

Dashboard and notification email delivery are NOT confirmed. `confirmed`, `dashboard_email_confirmed`, privacy approval and production collection remain false. `api_acknowledged` records API acceptance only. No research participants were contacted.

## Check delivery

1. Open your FormSubmit account and the form associated with this endpoint. Find the submission by the synthetic label, session ID above, or provider receipt ID.
2. Open the submission's `session_json` value (or download its export). Check `trials` has exactly eight entries, `order` has eight unique claim IDs, `condition` is B, `language` is en, and each trial includes response, response_time_ms, citation_opened, source_open_count, source_view_time_ms and events. Confirm `synthetic: true` and `mode: synthetic-pilot`.
3. Check the notification inbox configured for this form, including spam/junk. Match the session ID and verify the complete structured payload is accessible rather than truncated. API success alone does not prove email arrival.
4. Tell the researcher/developer whether BOTH dashboard and email show the full eight-trial data. Keep the synthetic record excluded from research analysis. If delivery is missing, inspect notification recipient/verification, quota and spam settings before requesting another test; do not repeatedly submit blindly.

Private local evidence is in ignored, HTTP-denied `qa/formsubmit-pilot/payload.json`, `attempt.json` and `receipt.json`. `scripts/synthetic-submission.mjs` is a researcher CLI and refuses to run again if an attempt file exists. The participant adapter continues to reject synthetic and researcher-test sessions. The CLI uses the same FormSubmit payload builder and acknowledgment validator but is deliberately separate from live activation gates.

The English consent is preserved in `src/data/consent.json` and `docs/CONSENT_ENGLISH.md`; the Simplified Chinese draft is in `docs/CONSENT_CHINESE_REVIEW.md`. Both are reviewable on researcher.html. Local participants continue seeing truthful local-only wording; the complete remote consent becomes active only after release and privacy verification. Contact and retention placeholders, withdrawal approval and translation approval remain unresolved.

Corrected EC2 now has transparent, readable highlights at Table 1 on page 2. Extracted text and two-page count match the original. This supersedes the earlier EC2 blocker; publication rights and scientific approvals remain separate and unchanged.

## Subsequent researcher confirmation

The researcher confirmed receipt in email of all eight trial records. Delivery verification now records that evidence; dashboard receipt is not separately claimed. The researcher approved the contact Alaa.Mezghiche26@student.xjtlu.edu.cn, 30-day retention and deletion requests by email. Consent now asks participants to quote their study ID. Other scientific, asset and release gates remain active, and both environment configurations remain preview. Earlier pending-delivery and missing-contact statements above describe the original pilot state. See FORMSubmit_CSV_GUIDE.md for offline export conversion.
