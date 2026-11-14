# Convert collected FormSubmit responses to Excel CSV

The website still sends one submission per completed participant. This converter runs offline and sends no email or network requests. Keep exports and the private answer key on the research team's computer, outside the published website.

1. Export your form's submissions from FormSubmit as CSV or JSON. Save the original export unchanged in the project's `research-data` folder.
2. Open PowerShell in the experiment project folder and run:

   ```powershell
   .\Convert-FormSubmit.ps1 -InputFiles '.\research-data\formsubmit-export.csv'
   ```

   JSON works the same way. To combine multiple files, use:

   ```powershell
   .\Convert-FormSubmit.ps1 -InputFiles '.\research-data\first.csv','.\research-data\second.json'
   ```

3. Open `research-data/combined-trials.csv` directly in Excel. UTF-8 with BOM preserves Chinese text. Each accepted participant has eight rows. All requested fields plus `session_id`, `claim_supported` and `answer_correct` are included. If your Excel regional settings display one column, use Data > From Text/CSV and choose comma as the delimiter.
4. Review `research-data/combined-trials.report.json` before analysis. It lists excluded records and duplicate submissions. Identical duplicates count once; conflicting copies of a participant are all excluded pending researcher review. Fix conflicts in a separate reviewed input copy and rerun. Each run replaces its output rather than appending.

Supported inputs: CSV with a `session_json` column; JSON records or arrays; `submissions`, `data` or `results` array wrappers; record fields nested in `data`, `fields` or `payload`; and direct saved session JSON. Malformed records are reported; an unreadable input file stops conversion. Missing mode is excluded, as only explicitly live records are eligible.

The converter uses `private_materials/answer-key.json`. `claim_supported` is the private key's boolean. `answer_correct` is true for include/supported or reject/unsupported. The key remains subject to the existing scientific review gate. No key is added to the participant build. Seconds are milliseconds divided by 1000; timing data are not otherwise changed. Interrupted trials remain present for subsequent timing-analysis exclusion under the existing analysis protocol; this CSV is not a replacement for that protocol.

Synthetic tests, preview sessions and researcher test sessions are excluded. The existing synthetic email submission was parsed into eight scored trials in automated tests, then correctly produced zero research rows through the normal converter. A separate in-memory live-shaped fixture verified eight-row output, CSV/JSON parity and duplicate handling; it was never submitted online.

For deletion requests, ask participants to quote the study ID displayed on completion. Locate their participant ID in original exports, the FormSubmit account, notification emails and derived research files; remove matching records and regenerate analysis outputs. Apply the agreed 30-day retention period to those copies and backups as well. The software does not automatically delete records from FormSubmit or email.
