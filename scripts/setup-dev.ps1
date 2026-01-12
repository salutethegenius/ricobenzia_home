# Development Environment Setup Script
# Run this script to set up your development environment

Write-Host "🚀 Setting up RicoBenzia Home Development Environment" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Check Node.js
Write-Host "`n📦 Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
    
    $nodeMajor = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($nodeMajor -lt 18) {
        Write-Host "⚠️  Warning: Node.js 18+ is recommended. Current: $nodeVersion" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "`n📦 Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

# Check Git
Write-Host "`n📦 Checking Git..." -ForegroundColor Yellow
$gitVersion = git --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git installed: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  Git not found. Some workflow features may not work." -ForegroundColor Yellow
}

# Install dependencies
Write-Host "`n📥 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Check for .env file
Write-Host "`n🔐 Checking environment variables..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "✅ .env.local found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.local not found" -ForegroundColor Yellow
    Write-Host "   Create .env.local for local development with:" -ForegroundColor Yellow
    Write-Host "   - VITE_SUPABASE_URL" -ForegroundColor Gray
    Write-Host "   - VITE_SUPABASE_ANON_KEY" -ForegroundColor Gray
    Write-Host "   - VITE_WALLETCONNECT_PROJECT_ID" -ForegroundColor Gray
}

# Run type check
Write-Host "`n🔍 Running TypeScript type check..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript type check passed" -ForegroundColor Green
} else {
    Write-Host "⚠️  TypeScript type check found errors" -ForegroundColor Yellow
}

# Run lint
Write-Host "`n🔍 Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Linting passed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Linting found issues (run 'npm run lint -- --fix' to auto-fix)" -ForegroundColor Yellow
}

# Summary
Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "✅ Development environment setup complete!" -ForegroundColor Green
Write-Host "`n💡 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Load workflow helpers: . .\scripts\workflow-helpers.ps1" -ForegroundColor White
Write-Host "   2. Start dev server: npm run dev" -ForegroundColor White
Write-Host "   3. Create feature branch: Create-Feature 'your-feature'" -ForegroundColor White
Write-Host "`n📚 Documentation:" -ForegroundColor Cyan
Write-Host "   - DEV_WORKFLOW.md - Complete development workflow guide" -ForegroundColor White
Write-Host "   - GIT_WORKFLOW.md - Git workflow and branching strategy" -ForegroundColor White
Write-Host "   - QUICK_START.md - Quick start guide" -ForegroundColor White
