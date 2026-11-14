# Evidence & Decisions — PSP404TC

## Participant-interface correction

Open `http://127.0.0.1:5173/researcher.html` while the dev server runs. This local-only page provides separate Group A and Group B flow links, genuine original-paper viewers, practice checks, release diagnostics and saved-session exports. It is excluded from the production build. Test flows use separate storage keys and do not change an existing randomized session.

Participant screens no longer show development banners, draft/highlight warnings, technical recovery explanations or researcher export controls. Completion shows a neutral thank-you; actual live transmission failures still offer plain-language recovery options and never claim success without acknowledgment.

The former missing-asset placeholder and Group B fallback have been removed. Missing research assets now stop the trial before timing or answering. Group A loads the supplied originals locally, starting at page 1. Group B research tasks remain unavailable until reviewed claim-specific highlights are supplied; the separately labeled synthetic fixture tests viewer mechanics only. Both practice variants show the same readable two-page demonstration source. The older preview-placeholder description below is superseded by this correction.

A local, mobile-first jsPsych 8.3.0 experiment with a Vite build, bundled PDF.js, English/Chinese interface, two persistent randomized groups and eight supplied draft claims. No CDN, Google fonts, tracking or AI APIs are loaded.

## Run locally

Install Node.js 22 or newer and pnpm 11.25.0. From this folder:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
python researcher_tools/test_analysis.py
pnpm build
pnpm preview
```

Open the URL printed by Vite (normally http://127.0.0.1:5173/). On this Windows machine, `Start-Preview.ps1` locates the bundled Node runtime if Node is not on PATH. Existing dependencies are installed. Keep the preview process open while using it. `pnpm preview` serves the distribution build; it deliberately has placeholder papers until distribution rights are cleared. Use `pnpm dev` for the original local PDFs.

## What is implemented

- Language selection; neutral welcome; affirmative adult consent; decline without an ID; separate fictional practice.
- Assignment once, after practice, with 50/50 independent probability; no exact sample balance guarantee.
- Each paper once per four-trial half; different papers at the boundary; randomized first claim per paper; saved seed/order.
- Full original PDFs available locally (3/3/2/3 pages); zoom and pan; accessible modal controls. Canvas PDF text is visual, not a screen-reader text layer; accommodation testing is pending.
- A opens page 1. B accepts a claim-specific full highlighted PDF plus page/vertical anchor; missing research highlights are disclosed in preview and block live mode. Practice demonstrates a highlighted page without inventing research evidence.
- Source-open requirement, explicit answer, continuous monotonic timing, visibility/page/zoom/source events, paper carryover flag.
- Local commit after every trial, restart-and-flag interrupted trials, stable ID for submission/retry, JSON/CSV backups.
- Configurable FormSubmit.app or custom JSON receiver, disabled by default; strict API acknowledgment checks.
- Private offline scoring, participant summaries, de-duplication, bootstrap intervals and descriptive SVG charts.

The interface is bilingual. Scientific claims remain the exact supplied English wording (with normalized whitespace/apostrophes); no unapproved Chinese translation is presented. A reviewer must supply and approve Chinese claim translations before live mode.

## Source materials and missing files

Read `docs/MATERIALS_AND_READINESS.md`. The supplied `CODEX_MASTER_PROMPT.md` and `EXPERIMENT_SPEC_V2.md` were read. The requested original README, audit, deployment document, mapping CSV, templates, Assignment 2 and highlighted files were not found. The extra museum paper was reviewed but is outside the four-paper design and is not used as a trial.

## Configure evidence

Edit `src/data/evidence-manifest.json` for every claim. Use project-relative asset paths such as `assets/papers/CS/original.pdf` and `assets/papers/CS/CS1.pdf`. Only place publication-cleared PDFs in `public/assets/papers/`.

`target_page` is 1-based; `target_scroll_anchor` is a 0–1 vertical coordinate down the page. The reader places the target about 40px below the viewport top. Set the highlight count to 1 or 2 and `highlight_claim_ids` to ONLY the current claim. Verify all pages and non-highlight content match, and review both passages when two are necessary. Flags are signed-off manual reviews, not automated proof of scientific correctness. Never approve a variant that highlights answers to another claim.

## Collection and deployment — only after owner approval

1. Resolve every item in `docs/MATERIALS_AND_READINESS.md`. Replace consent placeholders with approved researcher contact, recipient, retention, and withdrawal wording in both locales. Approve exact claims/translations and evidence. Change the preview banner/welcome text to approved study wording when preparing the live release.
2. Configure and pilot the receiver using `docs/SUBMISSION.md`. Copy `.env.example` to `.env.local`, retaining preview mode until explicit release. Never put a private API key in Vite variables.
3. Run `pnpm check:live`. It currently fails intentionally. Complete actual phone, inbox, privacy and China network checks before marking the respective approvals true. `owner_release` must remain false until the user approves publication/collection.
4. Review Git tracked files. Never commit `private_materials`, `local-assets`, research data, answer keys, coursework/questionnaire PDFs or unapproved paper scans. Gitignore is a precaution, not a substitute for review. Publish ONLY `dist` as the Pages artifact.
5. After authorization, create your GitHub repository and push the reviewed source. In repository Settings → Pages choose GitHub Actions. Set the repository variable `SUBMISSION_ENDPOINT` to the public form URL. The workflow is manual-only, requires input `APPROVED`, runs live readiness/tests/build, and deploys `dist`. There is no push-triggered deployment. Relative Vite asset paths support project subdirectories.
6. Test the exact published URL and endpoint on mainland-China campus Wi-Fi and phone data with VPN OFF before recruitment. Confirm arrival in the intended inbox and export reconstruction, not merely HTTP success.

## Offline analysis

```sh
python researcher_tools/score_and_analyze.py research-data/session1.json research-data/session2.json --key private_materials/answer-key.json --out research-data/analysis
```

Inputs: session JSON, arrays of sessions, or provider records with `session_json` directly or under `data`. For email exports, save the `session_json` field as JSON first; arbitrary mailbox formats are not parsed. Output: `sessions.csv`, `trials.csv`, `participant_summary.csv`, `descriptive_comparison.json`, `group_means.svg`. The supplied key is a draft and needs independent team review. Preview records never enter live group comparisons. No fabricated research outcomes are included.

See `researcher_tools/data_dictionary.md`, `docs/METHODS_AND_SCREENSHOTS.md` and `docs/QA.md` for timing policy, exclusions, evidence and remaining verification limits.
