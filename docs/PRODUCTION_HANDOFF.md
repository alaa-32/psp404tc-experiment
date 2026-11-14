# Production handoff

The professor's supervised-coursework approval for these four papers is recorded in `src/data/coursework-approval.json` and each evidence mapping. It is separate from public redistribution. No replacement papers or changes to the eight claims, randomization or timing are proposed. The remaining `course_requirements` gate concerns overall coursework/research requirements, not a request to reapprove paper use.

## Ready for review

- EC2 is regenerated from the original two-page paper, highlighting the explicit results passage on page 2 instead of ambiguous treatment columns. Text/page equivalence and visual readability pass. The original user-supplied files are unchanged.
- All eight Chinese drafts are in `docs/CHINESE_CLAIMS_REVIEW.md` and `src/data/claims-public.json`. Translation approval remains false; the existing experiment does not silently present unapproved translations.
- Consent EN/ZH documents include the configured contact, retention from submission, study-ID withdrawal and the distinction between a browser copy and a submitted response. Review and approve this final wording before release.
- Local progress expires 30 days after first submission attempt, or after session start if never submitted. Expired copies are removed when the study next opens; a static website cannot clear storage while the browser is closed. Retries do not restart retention. Live completion includes a browser-copy removal control, disabled during submission, with a reminder to retain the ID and email for remote deletion.
- FormSubmit endpoint, one-session submission adapter and successful synthetic delivery evidence remain unchanged. No new test email was sent.

## Remote retention procedure — team responsibility

Use the first submission timestamp (or provider receipt date for legacy records) to establish the 30-day deadline. Assign a team member to check deadlines and deletion requests daily. Search by the participant's study ID and remove matching records from the FormSubmit account, notification inbox including deleted-items folders, exports, derived analyses and research backups. Recreate combined CSV outputs after exclusions. Do not keep identifying withdrawal emails longer than necessary. Browser deletion does not perform any of these remote actions. Confirm this procedure is feasible for the team's account before approving the consent promise.

## Hosting and deployment

1. Confirm the permitted hosting arrangement. For public GitHub Pages, record permission covering the exact original and highlighted PDFs. If permission permits only restricted university hosting, retain the same experiment but deploy it under that permitted arrangement; do not mark public permission true.
2. After public permission is established, copy only approved files into `public/papers/`. For every claim mapping, populate `original_asset` and `guided_asset` (relative `papers/name.pdf` paths), `publication_permission_reference`, and `asset_sha256` mapping each path to its approved SHA-256. Set rights/researcher approval only after the actual review. Shared original files must have consistent hashes in all associated claims. The build/source checks reject unknown PDFs, missing approval, path traversal and changed bytes. `*.pdf` remains ignored, so explicitly stage only the vetted public files when authorized.
3. Review EC2 and other evidence mappings, claims/key, Chinese drafts and final consent. Preserve approvals as false until confirmed. Complete real-phone/China-network testing and remaining overall course/submission-contract review.
4. Configure repository variable `SUBMISSION_ENDPOINT` to `https://formsubmit.app/f/rrr95n9ge3`. The production workflow explicitly uses live mode and disables the practice-only preview; it still cannot pass until all gates are satisfied. Its package-manager setup now matches the working preview workflow. CI checks public files rather than requiring private local PDF copies.
5. After explicit production authorization, rerun tests, live validation and artifact checks, push the reviewed files, and run **Publish approved experiment** with **APPROVED**. Do not run the preview workflow over an active live study. Both use the same Pages address.

The preview workflow remains practice-only with a blank receiver. It deliberately rejects PDFs in its artifact even if future production rights are approved. No live collection or publication was enabled in this update.
