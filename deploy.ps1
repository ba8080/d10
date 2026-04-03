# ============================================
# D10 Website - Build, Commit & Push Script
# Usage: .\deploy.ps1 "your commit message"
# ============================================

param(
    [string]$CommitMessage = "Update website $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host ""
Write-Host "[DEPLOY] D10 Deploy Script" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[X] npm install failed!" -ForegroundColor Red
        exit 1
    }
}

# Step 2: Build the project
Write-Host "[*] Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Build successful!" -ForegroundColor Green

# Step 3: Stage all changes
Write-Host ""
Write-Host "[*] Staging changes..." -ForegroundColor Yellow
git add -A

# Step 4: Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "[!] No changes to commit." -ForegroundColor Yellow
    exit 0
}

# Step 5: Commit
Write-Host "[*] Committing: $CommitMessage" -ForegroundColor Yellow
git commit -m "$CommitMessage"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Commit failed!" -ForegroundColor Red
    exit 1
}

# Step 6: Push
Write-Host "[*] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Push failed! You may need to pull first: git pull --rebase origin main" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[OK] Done! GitHub Actions will now build and deploy to https://www.d10.store" -ForegroundColor Green
Write-Host "[i] Check deployment status at: https://github.com/ba8080/d10/actions" -ForegroundColor Cyan
Write-Host ""
