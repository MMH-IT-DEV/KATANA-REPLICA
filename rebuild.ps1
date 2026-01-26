# Helper script to clear Next.js cache and restart dev server
Write-Host "Cleaning .next cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}
Write-Host "Clean complete. Starting dev server..." -ForegroundColor Green
npm run dev
