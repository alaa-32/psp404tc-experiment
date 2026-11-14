# QA record — 2026-11-10

Passed:

- 11 automated Node tests: 10,000 constrained orders, persistent assignment, submit enforcement, monotonic/hidden timing, release gates and highlight scope, locale parity, preview/incomplete submission denial, concurrent duplicate guard, acknowledgment validation, CSV quoting, FormSubmit contract and payload limit.
- 3 automated Python tests: scoring denominators, preview exclusion, interruption timing exclusion, de-duplication and output generation.
- Vite production build. Relative assets checked for GitHub project subpaths. Build emits a non-fatal >500KB chunk advisory from the bundled PDF engine.
- Browser: consent → instructions → practice → eight trials → debrief; actual four original PDFs rendered; page navigation and zoom; decision disabled until source opened and answer selected; recovery after reload; all eight responses in downloaded JSON; interrupted flag and four carryover flags verified. No console errors in this end-to-end run.
- Browser: 360px viewer, 390px completion, 1280px welcome; Chinese welcome and consent-decline. These are desktop viewport simulations, not physical phones.
- Synthetic viewer fixture: A starts page 1/top; B starts page 3 and scrolls to two fictional highlighted rectangles; all pages accessible. Fixtures contain no research evidence. Open `/tests/viewer.html` in the dev server to repeat. Actual research B materials are NOT supplied/verified.
- Local homepage HTTP 200; private answer-key URL HTTP 403.
- `check:live` fails intentionally with 39 blockers before any release. Nothing was published or submitted remotely.

Fixed during QA: custom jsPsych plugin originally returned an async lifecycle promise that finished the trial before a response. The plugin now exposes a synchronous lifecycle entry with separate asynchronous source preparation and explicit finish on valid response. Browser end-to-end verification passed after the fix.

NOT VERIFIED: actual iPhone/Android PDF memory/performance, physical mainland-China connectivity, hosted GitHub Pages URL, remote CORS/API/inbox, provider exports, final Chinese scientific translations, actual guided PDF equivalence/anchors and accessibility accommodations. Local build validation does not certify these external gates.

Repeat: `pnpm test`, `python researcher_tools/test_analysis.py`, `pnpm build`, `node scripts/check-dist.mjs`, `pnpm check:live` (expected rejection while pending). On a fresh browser/profile walk through consent/practice and all trials; reload a claim and confirm recovery; download JSON and verify eight records and stable order. Test A/B with approved assets before real use. Do not manually switch a participant's condition.
