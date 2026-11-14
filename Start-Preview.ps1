Set-Location $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $nodePath = $nodeCommand.Source } else {
  $bundles = Get-ChildItem 'C:\Program Files\WindowsApps' -Directory -Filter 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue
  $nodePath = $bundles | ForEach-Object { Join-Path $_.FullName 'dependencies\node\bin\node.exe' } | Where-Object { Test-Path $_ } | Select-Object -Last 1
}
if (-not $nodePath) { throw 'Install Node.js 22 or newer, then run pnpm install and pnpm dev.' }
if (-not (Test-Path 'node_modules/vite/bin/vite.js')) { throw 'Dependencies missing: run pnpm install --frozen-lockfile.' }
& $nodePath node_modules/vite/bin/vite.js --host 127.0.0.1
