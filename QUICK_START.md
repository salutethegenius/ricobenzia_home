# Quick Start Guide - Git Workflow

> **TL;DR:** Never push to `main`. Always use feature branches → PR to `develop` → PR to `main`.

## 🚀 First Time Setup (Do This Once)

### 1. Create `develop` Branch

```powershell
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop
```

### 2. Set Up Branch Protection

Go to: `https://github.com/salutethegenius/ricobenzia_home/settings/branches`

- Add rule for `main`:
  - ✅ Require PR reviews (1 approval)
  - ✅ Require status checks (`build-and-test`)
  - ✅ No force push
  - ✅ No deletion

### 3. Load Helper Scripts

```powershell
. .\scripts\workflow-helpers.ps1
```

---

## 📝 Daily Workflow

### Starting Work

```powershell
# Load helpers (if not already loaded)
. .\scripts\workflow-helpers.ps1

# Create feature branch
Create-Feature "your-feature-name"
```

### Making Changes

```powershell
# Make your changes, then:
git add .
git commit -m "feat: description of changes"
git push origin feature/your-feature-name
```

### Before Creating PR

```powershell
# Run checks
npm run pre-deploy
```

### Creating PR

1. Go to GitHub
2. Create PR: `feature/your-feature-name` → `develop`
3. Wait for CI checks
4. Get approval
5. Merge

### Deploying to Production

1. Create PR: `develop` → `main`
2. Wait for CI checks
3. Get approval
4. Merge
5. Vercel auto-deploys

---

## 🆘 Emergency Fix

```powershell
Create-Hotfix "fix-description"
# Make fix, commit, push
# Create PR to main
# After merge, run: Sync-Develop
```

---

## 📚 Full Documentation

- **`DEV_WORKFLOW.md`** - Complete development workflow guide
- **`WORKFLOW_SETUP.md`** - Complete setup instructions
- **`GIT_WORKFLOW.md`** - Detailed workflow guide
- **`BRANCH_PROTECTION_SETUP.md`** - Branch protection setup

---

## ✅ Checklist Before Production Deploy

- [ ] `npm run pre-deploy` passes
- [ ] Tested on preview/staging
- [ ] No console errors
- [ ] Responsive design works
- [ ] Wallet connection works
- [ ] Environment variables set in Vercel

---

**Remember:** `main` = Production. Always test on `develop` first!
