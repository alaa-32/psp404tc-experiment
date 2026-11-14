param(
    [Parameter(Mandatory=$true, Position=0)] [string[]]$InputFiles,
    [string]$Output = "$PSScriptRoot/research-data/combined-trials.csv"
)
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
$bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
if (Test-Path -LiteralPath $bundledPython) { $converterPython = $bundledPython }
elseif ($pythonCommand) { $converterPython = $pythonCommand.Source }
else { throw 'Python 3 is required to run the offline converter.' }
& $converterPython "$PSScriptRoot/researcher_tools/convert_formsubmit.py" @InputFiles --out $Output
if ($LASTEXITCODE -ne 0) { throw 'Conversion failed. Check the input export and error above.' }
Write-Host "CSV: $Output"
Write-Host "Review the adjacent .report.json file for exclusions and duplicates."
