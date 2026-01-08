# Workflow Setup Instructions

This document provides step-by-step instructions to set up the complete Git workflow for RicoBenzia Home.

## ✅ What's Been Set Up

The following files have been created in your repository:

1. **`GIT_WORKFLOW.md`** - Complete workflow guide and best practices
2. **`BRANCH_PROTECTION_SETUP.md`** - Instructions for setting up branch protection
3. **`.github/workflows/ci.yml`** - GitHub Actions CI/CD pipeline
4. **`scripts/workflow-helpers.ps1`** - PowerShell helper functions
5. **`scripts/pre-deploy-check.js`** - Pre-deployment validation script
6. **`package.json`** - Updated with `pre-deploy` script

---

## 🚀 Initial Setup Steps

### Step 1: Create the `develop` Branch

If you don't have a `develop` branch yet, create it:

```powershell
# Navigate to your repository
cd C:\Users\bushm\ricobenzia_home

# Ensure you're on main and it's up to date
git checkout main
git pull origin main

# Create develop branch from main
git checkout -b develop

# Push develop to remote
git push -u origin develop
```

### Step 2: Set Up Branch Protection

Follow the instructions in **`BRANCH_PROTECTION_SETUP.md`**:

1. Go to GitHub: `https://github.com/salutethegenius/ricobenzia_home/settings/branches`
2. Add protection rules for `main` branch:
   - Require pull request reviews (1 approval)
   - Require status checks (`build-and-test`)
   - Do not allow force pushes
   - Do not allow deletions
3. (Optional) Add protection for `develop` branch

### Step 3: Configure Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **ricobenzia_home** project
3. Go to **Settings** → **Git**
4. Ensure:
   - **Production Branch:** `main`
   - **Preview Deployments:** Enabled
5. (Recommended) Go to **Settings** → **Deployment Protection**
   - Enable **Production Deployment Protection**

### Step 4: Test the Workflow

#### Test Helper Scripts

```powershell
# Load the helper functions
. .\scripts\workflow-helpers.ps1

# Test creating a feature branch
Create-Feature "test-feature"

# Make a small change, commit, and push
# Then create a PR on GitHub to test the workflow
```

#### Test Pre-Deployment Check

```powershell
# Run the pre-deployment check
npm run pre-deploy
```

This should:
- ✅ Build your project
- ✅ Run linter
- ✅ Check for build output
- ✅ Verify required files exist

#### Test GitHub Actions

1. Create a test feature branch
2. Make a small change
3. Push to GitHub
4. Create a Pull Request
5. Check the **Actions** tab on GitHub to see CI running

---

## 📋 Daily Workflow

### Starting a New Feature

```powershell
# Option 1: Use helper script
. .\scripts\workflow-helpers.ps1
Create-Feature "your-feature-name"

# Option 2: Manual
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Before Creating a PR

```powershell
# Run pre-deployment checks
npm run pre-deploy

# If all checks pass, push and create PR
git push origin feature/your-feature-name
```

### Deploying to Production

1. Ensure `develop` is stable and tested
2. Create PR from `develop` → `main` on GitHub
3. Wait for CI checks to pass
4. Get approval (if required)
5. Merge PR
6. Monitor Vercel deployment

---

## 🛠️ Using Helper Scripts

### Load Helper Functions

```powershell
# In PowerShell, source the script
. .\scripts\workflow-helpers.ps1
```

### Available Commands

| Command | Description |
|---------|-------------|
| `Create-Feature <name>` | Create a new feature branch from develop |
| `Create-Hotfix <name>` | Create a new hotfix branch from main |
| `Sync-Develop` | Sync develop branch with main |
| `Cleanup-Branches` | Clean up merged branches |
| `Show-WorkflowStatus` | Show current workflow status |

### Examples

```powershell
# Create a feature
Create-Feature "add-dark-mode"

# Create a hotfix
Create-Hotfix "fix-wallet-connection"

# Sync develop after a hotfix
Sync-Develop

# Check status
Show-WorkflowStatus
```

---

## 🔍 Verification Checklist

After setup, verify everything works:

- [ ] `develop` branch exists and is pushed to remote
- [ ] Branch protection is enabled for `main` on GitHub
- [ ] GitHub Actions workflow runs on PRs (check Actions tab)
- [ ] Vercel is configured with `main` as production branch
- [ ] `npm run pre-deploy` runs successfully
- [ ] Helper scripts work (`Create-Feature` test)
- [ ] You cannot push directly to `main` (protection working)

---

## 🚨 Troubleshooting

### GitHub Actions Not Running

1. Check that `.github/workflows/ci.yml` exists
2. Go to **Settings** → **Actions** → **General**
3. Ensure "Allow all actions and reusable workflows" is enabled
4. Check the **Actions** tab for any errors

### Pre-Deploy Script Fails

- Ensure Node.js is installed: `node --version`
- Ensure dependencies are installed: `npm install`
- Check that build works: `npm run build`

### Helper Scripts Not Working

- Ensure you're in PowerShell (not CMD)
- Check that you've sourced the script: `. .\scripts\workflow-helpers.ps1`
- Verify Git is installed: `git --version`

### Branch Protection Not Working

- Verify you set it up in GitHub Settings → Branches
- Check that the branch name pattern matches exactly (`main`)
- Ensure you're not an admin bypassing rules (if that setting is enabled)

---

## 📚 Next Steps

1. **Read `GIT_WORKFLOW.md`** for complete workflow documentation
2. **Read `BRANCH_PROTECTION_SETUP.md`** for protection setup
3. **Start using the workflow** for your next feature
4. **Monitor deployments** in Vercel dashboard

---

## 🎯 Quick Reference

### Common Commands

```powershell
# Start new feature
Create-Feature "feature-name"

# Check before deploying
npm run pre-deploy

# Sync branches
Sync-Develop

# Check status
Show-WorkflowStatus
```

### Branch Flow

```
main (Production) ← PR from develop
  ↑
develop (Development) ← PR from feature/*
  ↑
feature/* (Your work)
```

---

## 💡 Tips

1. **Always pull before starting work:**
   ```powershell
   git checkout develop
   git pull origin develop
   ```

2. **Run pre-deploy before creating PR:**
   ```powershell
   npm run pre-deploy
   ```

3. **Keep branches small and focused** - easier to review and test

4. **Monitor CI/CD** - Check GitHub Actions and Vercel after each PR

5. **Test on preview** - Vercel creates preview URLs for each PR

---

**Your workflow is now set up! 🎉**

For questions or issues, refer to `GIT_WORKFLOW.md` or the GitHub documentation.
