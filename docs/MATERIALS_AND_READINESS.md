# Materials audit and release gates

Reviewed: the supplied questionnaire; cs.pdf (3 pages), robotic.pdf (3), economic.pdf (2), edu.pdf (3); Assignment 1 (9 pages); EXPERIMENT_SPEC_V2.md; CODEX_MASTER_PROMPT.md; pasted blueprint. The extra museum paper is not part of the selected experiment. Source extraction found malformed headers/xref warnings in some files; PDF.js successfully rendered the research documents in the end-to-end test.

Not supplied/found: original README_START_HERE, RESEARCH_MATERIALS_AUDIT, DEPLOYMENT_AND_SAFETY, CLAIM_MAPPING_OVERVIEW, template manifests/CSV, reviewed claim mapping/key, Assignment 2, Chinese claims, highlighted variants. Newly authored documents do not pretend to be the missing source files.

Paper subjects: CS smartphone use in cold weather; RB occupied recipients and robotic delivery; EC restaurant donation suggestions; ED gamification and performance. Source-based draft evidence page locations are in the PRIVATE audit; they must not become participant answer cues.

Release blockers:

- Two reviewers approve all eight exact English claims, answer key and Chinese translations. Wording referring to “the same experiment/survey” can precede its companion claim under randomization; review whether paper labels provide adequate context before approving any wording change.
- Supply eight question-specific highlighted full PDFs and anchors. Some questions may require two passages; no count is assumed. Check content and page equivalence and leakage manually.
- Rights clearance for public distribution of every full paper. Local copies are ignored and are never bundled in the build.
- Final consent/contact/recipient/retention/withdrawal/debrief wording approved. The preview contains explicit placeholders, not an ethics approval.
- Independent iPhone/Android tests, both conditions, all pages, readable zoom and within-page anchoring.
- Approved receiver endpoint, quota budget, privacy/retention review, successful real inbox delivery and reconstruction from export.
- Mainland-China campus Wi-Fi and phone-data tests without VPN.
- Confirm instructor approval for two hypotheses: Assignment 1 says at least one hypothesis per student and normally three students. Preserve the requested two-hypothesis design pending confirmation; do not add an invented hypothesis.
- Assignment 2 is missing; its detailed screenshot/report requirements cannot be certified from Assignment 1 alone.
- Explicit owner authorization to publish and start collection.

`src/data/approvals.json` starts with all flags false. `pnpm check:live` refuses release while any flag, translation, evidence mapping, asset or scientific review is missing. Publication is not automatic.
