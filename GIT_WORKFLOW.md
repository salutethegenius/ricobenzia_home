# Git Workflow Guide for RicoBenzia Home

> **Critical Rule:** Never push directly to `main` branch. Always use feature branches and pull requests.

## 🌳 Branch Strategy

### Branch Types

1. **`main`** (Production)
   - **Protected branch** - requires PR approval
   - Always deployable to production
   - Only updated via Pull Requests from `develop` or `staging`
   - Automatically deploys to Vercel production

2. **`develop`** (Development/Staging)
   - Main development branch
   - Integration branch for features
   - Can be deployed to Vercel preview/staging environment
   - All feature branches merge here first

3. **`staging`** (Pre-Production Testing)
   - Optional branch for final testing before production
   - Mirrors production environment
   - Used for final QA before merging to `main`

4. **`feature/*`** (Feature Branches)
   - Named: `feature/description-of-feature`
   - Examples: `feature/add-dark-mode`, `feature/update-nft-gate`
   - Created from `develop`
   - Merged back to `develop` via PR

5. **`hotfix/*`** (Emergency Fixes)
   - Named: `hotfix/description-of-fix`
   - Created from `main` for urgent production fixes
   - Merged to both `main` and `develop`

6. **`bugfix/*`** (Bug Fixes)
   - Named: `bugfix/description-of-bug`
   - Created from `develop`
   - Merged back to `develop` via PR

---

## 📋 Standard Workflow

### Starting a New Feature

```bash
# 1. Ensure you're on develop and it's up to date
git checkout develop
git pull origin develop

# 2. Create a new feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git add .
git commit -m "feat: description of your feature"

# 4. Push to remote
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# - Base: develop
# - Compare: feature/your-feature-name
# - Add reviewers if needed
# - Wait for CI checks to pass
# - Get approval
# - Merge PR
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add NFT gating to vault section
fix: resolve wallet connection issue on mobile
docs: update deployment instructions
refactor: optimize chart rendering performance
```

### Deploying to Production

```bash
# 1. Ensure develop is stable and tested
git checkout develop
git pull origin develop

# 2. Create staging branch for final testing (optional)
git checkout -b staging/pre-production
git push origin staging/pre-production

# 3. Test on staging environment
# ... perform QA testing ...

# 4. Create PR from develop (or staging) to main
# - Base: main
# - Compare: develop (or staging/pre-production)
# - Ensure all CI checks pass
# - Get required approvals
# - Merge PR

# 5. After merge, main will auto-deploy to Vercel
# Monitor deployment in Vercel dashboard
```

### Hotfix Workflow (Emergency Production Fix)

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# 2. Make the fix
git add .
git commit -m "fix: critical bug description"

# 3. Push and create PR to main
git push origin hotfix/critical-bug-fix

# 4. After merging to main, also merge to develop
git checkout develop
git merge main
git push origin develop
```

---

## 🔒 Branch Protection Rules

### Main Branch Protection (Set in GitHub)

1. **Require pull request reviews before merging**
   - At least 1 approval required
   - Dismiss stale reviews when new commits are pushed

2. **Require status checks to pass before merging**
   - Required checks: `build-and-test`
   - Require branches to be up to date before merging

3. **Do not allow force pushes**
   - Prevents accidental overwrites

4. **Do not allow deletions**
   - Prevents accidental branch deletion

### Develop Branch Protection (Recommended)

1. **Require pull request reviews** (optional, but recommended)
2. **Require status checks to pass**
3. **Do not allow force pushes**

See `BRANCH_PROTECTION_SETUP.md` for detailed setup instructions.

---

## 🚀 Deployment Strategy

### Environments

1. **Production** (`main` branch)
   - URL: `ricobenzia-home.vercel.app` (or custom domain)
   - Auto-deploys on merge to `main`
   - Requires manual approval in Vercel (recommended)

2. **Preview/Staging** (`develop` branch)
   - URL: `ricobenzia-home-git-develop.vercel.app`
   - Auto-deploys on push to `develop`
   - Used for testing before production

3. **Feature Previews** (`feature/*` branches)
   - URL: `ricobenzia-home-git-feature-*.vercel.app`
   - Auto-deploys on push to feature branches
   - Great for testing individual features

### Vercel Configuration

Ensure your Vercel project is configured:
- Production branch: `main`
- Preview deployments: Enabled for all branches
- Deployment protection: Enable for `main` (requires manual approval)

---

## ✅ Pre-Deployment Checklist

Before merging to `main`, verify:

- [ ] All tests pass locally (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Pre-deployment check passes (`npm run pre-deploy`)
- [ ] No console errors in browser
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Wallet connection works correctly
- [ ] All external integrations (TradingView, etc.) function
- [ ] No sensitive data in code (check `.env` files)
- [ ] Environment variables are set in Vercel
- [ ] Documentation updated if needed
- [ ] Code reviewed and approved

---

## 🛠️ Useful Git Commands

### Viewing Branch Status
```bash
# See all branches
git branch -a

# See current branch and status
git status

# See commit history
git log --oneline --graph --all
```

### Syncing with Remote
```bash
# Fetch latest changes
git fetch origin

# Update current branch
git pull origin <branch-name>

# Update develop
git checkout develop
git pull origin develop
```

### Cleaning Up
```bash
# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature

# Clean up merged branches
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d
```

---

## 🚨 Emergency Procedures

### Rollback Production

If something goes wrong in production:

1. **Option 1: Revert via Git**
   ```bash
   git checkout main
   git revert <commit-hash>
   git push origin main
   ```

2. **Option 2: Rollback in Vercel**
   - Go to Vercel dashboard
   - Find previous successful deployment
   - Click "Promote to Production"

### Fix Broken Main Branch

```bash
# 1. Create hotfix branch
git checkout main
git checkout -b hotfix/fix-broken-main

# 2. Fix the issue
# ... make changes ...

# 3. Commit and push
git add .
git commit -m "fix: restore main branch functionality"
git push origin hotfix/fix-broken-main

# 4. Create PR to main (fast-track approval)
# 5. Merge and deploy
```

---

## 📊 Workflow Diagram

```
main (Production)
  ↑
  │ PR (after testing)
  │
develop (Development)
  ↑
  │ PR (after review)
  │
feature/* (Feature Branches)
  │
  └─→ Work on feature
      └─→ Test locally
          └─→ Push and create PR
              └─→ Review and merge to develop
                  └─→ Test on staging
                      └─→ PR to main
                          └─→ Deploy to production
```

---

## 🎯 Best Practices

1. **Always pull before starting work**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Keep branches small and focused**
   - One feature per branch
   - Easier to review and test

3. **Commit often, push regularly**
   - Small, logical commits
   - Push to remote for backup

4. **Write descriptive commit messages**
   - Follow conventional commits
   - Explain what and why

5. **Test before creating PR**
   - Run build locally
   - Test functionality
   - Check for errors

6. **Use PR descriptions**
   - Explain what changed
   - Include screenshots if UI changed
   - Reference issues if applicable

7. **Monitor deployments**
   - Check Vercel dashboard after merge
   - Verify production site works
   - Monitor for errors

---

## 📝 Quick Reference

| Action | Command |
|--------|---------|
| Start feature | `git checkout -b feature/name` |
| Create PR | Via GitHub web interface |
| Deploy to prod | Merge PR to `main` |
| Emergency fix | `git checkout -b hotfix/name` from `main` |
| Update branch | `git pull origin <branch>` |
| View branches | `git branch -a` |
| Check status | `git status` |

---

## 🔗 Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Vercel Git Integration](https://vercel.com/docs/concepts/git)
- [Git Best Practices](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

**Remember:** The goal is to keep `main` stable and production-ready at all times. When in doubt, create a branch and test thoroughly before merging.
