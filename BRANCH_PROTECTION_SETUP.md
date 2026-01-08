# Branch Protection Setup Guide

This guide will help you set up branch protection rules in GitHub to ensure your production branch (`main`) is always protected.

## 🔒 Setting Up Branch Protection in GitHub

### Step 1: Navigate to Branch Settings

1. Go to your repository on GitHub: `https://github.com/salutethegenius/ricobenzia_home`
2. Click on **Settings** (top menu bar)
3. Click on **Branches** (left sidebar)

### Step 2: Protect the `main` Branch (Production)

1. Click **Add rule** or find existing rule for `main`
2. In **Branch name pattern**, enter: `main`
3. Configure the following settings:

#### ✅ Required Settings

- **✅ Require a pull request before merging**
  - Check: "Require approvals"
  - Set: `1` approval required
  - Check: "Dismiss stale pull request approvals when new commits are pushed"
  - (Optional) Restrict who can dismiss reviews

- **✅ Require status checks to pass before merging**
  - Check: "Require branches to be up to date before merging"
  - Under "Status checks that are required", select:
    - `build-and-test` (from GitHub Actions)

- **✅ Do not allow force pushes**
  - Prevents accidental overwrites of history

- **✅ Do not allow deletions**
  - Prevents accidental branch deletion

#### 🔐 Optional but Recommended

- **Restrict who can push to matching branches**
  - Only allow specific people/teams to push directly (if you want extra security)
  - Note: This is optional since PRs are required anyway

- **Do not allow bypassing the above settings**
  - Even admins must follow these rules

### Step 3: Protect the `develop` Branch (Recommended)

1. Click **Add rule** again
2. In **Branch name pattern**, enter: `develop`
3. Configure:

- **✅ Do not allow force pushes**
- **✅ Do not allow deletions**
- **✅ Require status checks to pass** (optional)
  - Select: `build-and-test`

### Step 4: Save Settings

Click **Create** or **Save changes** to apply the protection rules.

---

## 🚀 Vercel Deployment Protection

### Configure Vercel for Production Safety

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **ricobenzia_home** project
3. Go to **Settings** → **Git**
4. Configure:

#### Production Branch
- **Production Branch:** `main`
- This ensures only `main` deploys to production

#### Preview Deployments
- **Preview Deployments:** Enabled
- This allows all branches to get preview URLs for testing

#### Deployment Protection (Recommended)
1. Go to **Settings** → **Deployment Protection**
2. Enable **Production Deployment Protection**
3. This will require manual approval before deploying to production
4. You'll get a notification when a deployment is ready
5. Review and approve before it goes live

---

## ✅ Verification Checklist

After setting up, verify:

- [ ] `main` branch requires PR approval
- [ ] `main` branch requires status checks to pass
- [ ] Force push is disabled on `main`
- [ ] Branch deletion is disabled on `main`
- [ ] Vercel production branch is set to `main`
- [ ] Vercel deployment protection is enabled (optional but recommended)
- [ ] You can still create branches and PRs normally
- [ ] CI checks run on PRs

---

## 🧪 Test the Protection

Try to push directly to `main` (it should fail):

```bash
git checkout main
# Make a small change
echo "test" >> test.txt
git add test.txt
git commit -m "test: testing branch protection"
git push origin main
```

You should see an error like:
```
! [remote rejected] main -> main (protected branch hook declined)
```

This confirms protection is working! ✅

---

## 🔄 Workflow After Protection

Once protection is enabled:

1. **You cannot push directly to `main`**
   - Must use Pull Requests
   - Must get approval
   - Must pass CI checks

2. **You can still work normally on other branches**
   - `develop` - for development
   - `feature/*` - for new features
   - `hotfix/*` - for urgent fixes

3. **Deployment process:**
   - Create PR from `develop` → `main`
   - Wait for CI checks to pass
   - Get approval
   - Merge PR
   - Vercel automatically deploys (or waits for approval if protection enabled)

---

## 🆘 Troubleshooting

### "I can't merge my PR even though it's approved"

- Check that all required status checks have passed
- Ensure the branch is up to date with `main`
- Check if there are any merge conflicts

### "CI checks are not showing up"

- Make sure GitHub Actions workflow file exists (`.github/workflows/ci.yml`)
- Check that the workflow is enabled in repository settings
- Verify the workflow runs on the correct events

### "I need to make an emergency fix"

- Use the `hotfix/*` workflow (see `GIT_WORKFLOW.md`)
- Create a hotfix branch from `main`
- Create PR to `main` (will still require approval, but you can fast-track it)

---

## 📚 Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Vercel Deployment Protection](https://vercel.com/docs/deployments/protection)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Note:** These settings ensure your production site remains stable and only receives tested, approved changes.
