# Publish the existing public preview

Repository: https://github.com/alaa-32/psp404tc-experiment

Expected Pages URL after a successful deployment: https://alaa-32.github.io/psp404tc-experiment/

The local repository is initialized on `main`, its `origin` is connected, and only audited source files are staged. Nothing has been pushed by the agent. GitHub connectivity from the agent failed. The preview runs consent and fictional practice only: the eight research trials require publication permission for the original and highlighted PDFs. No PDFs or private data are staged. Collection is disabled and the preview build removes the receiving endpoint.

## Manual steps

1. Sign into GitHub as `alaa-32`. Confirm `psp404tc-experiment` exists and is public. If creating it, leave README, license and .gitignore initialization unchecked. If it already contains commits, stop before pushing and reconcile the histories; do not force push.
2. Open PowerShell on your computer:

   ```powershell
   cd 'C:\Users\mehdi\Documents\Codex\2026-11-10\x20\outputs\psp404tc-experiment'
   git diff --cached --stat
   node scripts/check-public-source.mjs
   git commit -m "Prepare public preview with collection disabled"
   git push -u origin main
   ```

   Complete GitHub's sign-in if prompted. If Git asks for commit identity, configure your own name and GitHub email locally with `git config user.name` and `git config user.email`, then repeat the commit. Do not paste passwords or tokens into chat. Do not use `git add .`; the intended public files are already staged.
3. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. You do not need to add another workflow template.
4. Open **Actions → Publish public preview (no collection) → Run workflow → main**. Do not run **Publish approved experiment**.
5. Wait for a green deployment, then open the URL shown by its `github-pages` environment. It should be https://alaa-32.github.io/psp404tc-experiment/. Send that link to teammates only after it opens successfully.
6. On phones, test both languages, consent/decline, source page navigation, highlighting and practice answer selection. Assignment remains random in the public build; `?test=B` does not override assignment there. The public preview stops after practice and explicitly says no responses were submitted. Local research flows remain available on the researcher's computer with the private PDFs.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Remaining live-release requirements

- Final explicit consent approval: contact is `Alaa.Mezghiche26@student.xjtlu.edu.cn`; retention is 30 days; deletion requests use email plus the study ID. Retention, withdrawal, Chinese consent and overall consent approval are pending final confirmation under the latest instruction.
- All eight claims: scientific review plus approved Chinese translations (currently absent).
- Each original/highlighted document: publication permission, researcher approval and public asset paths. Corrected EC2 passes local file/text/page checks; it still requires those permissions.
- Physical-phone and China-network tests, course-requirement review, submission-contract approval and explicit production release approval.

Complete email delivery of the eight-trial synthetic submission is already confirmed. No further email test was sent. The live gate deliberately fails until outstanding requirements are approved; preview deployment does not alter it. The preview and production workflows share the same Pages destination, so never run the preview workflow over an active live study.

## Withdrawal operations

The live completion screen shows the anonymous study ID in either language. Participants must keep that ID and include it in a deletion request. The team must remove matching responses from FormSubmit, notification emails, exports, derived analysis and backups, and implement the 30-day retention policy. These deletions are not automated by the static website.
