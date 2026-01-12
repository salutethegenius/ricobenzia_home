# Development Workflow Guide

This guide covers the complete development workflow for RicoBenzia Home project.

## 🚀 Quick Start

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/salutethegenius/ricobenzia_home.git
   cd ricobenzia_home
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5173`

3. **Load Helper Scripts (PowerShell)**
   ```powershell
   . .\scripts\workflow-helpers.ps1
   ```

---

## 📋 Development Workflow

### Standard Feature Development

```bash
# 1. Ensure you're on develop and updated
git checkout develop
git pull origin develop

# 2. Create feature branch
Create-Feature "your-feature-name"
# OR manually:
git checkout -b feature/your-feature-name

# 3. Make changes and test locally
npm run dev

# 4. Run checks before committing
npm run lint
npm run build

# 5. Commit changes (follow conventional commits)
git add .
git commit -m "feat: add your feature description"

# 6. Push and create PR
git push origin feature/your-feature-name
```

### Pre-Commit Checklist

Before committing, ensure:
- [ ] Code compiles without errors (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript type checks pass (`npx tsc --noEmit`)
- [ ] Changes tested in browser
- [ ] No console errors
- [ ] Responsive design works (mobile/tablet/desktop)

---

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run pre-deploy` | Run pre-deployment checks |

### Type Checking

```bash
# Check TypeScript types without building
npx tsc --noEmit
```

---

## 🔍 Code Quality

### Linting

The project uses ESLint with TypeScript and React rules.

```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues (where possible)
npm run lint -- --fix
```

### Type Checking

TypeScript is configured for strict type checking. Always ensure types are correct:

```bash
npx tsc --noEmit
```

---

## 🌿 Branch Strategy

### Branch Types

- **`main`** - Production (protected, requires PR)
- **`develop`** - Development/staging
- **`feature/*`** - Feature branches (from develop)
- **`hotfix/*`** - Emergency fixes (from main)
- **`bugfix/*`** - Bug fixes (from develop)

### Branch Naming

- Features: `feature/description` (e.g., `feature/add-dark-mode`)
- Hotfixes: `hotfix/description` (e.g., `hotfix/fix-wallet-connection`)
- Bugfixes: `bugfix/description` (e.g., `bugfix/resolve-mobile-nav`)

---

## 📝 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, styling
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add NFT gating to vault section
fix: resolve wallet connection on mobile
docs: update deployment instructions
refactor: optimize chart rendering
```

---

## 🔄 Pull Request Process

### Creating a PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR on GitHub**
   - Base: `develop` (or `main` for hotfixes)
   - Compare: `feature/your-feature`
   - Add descriptive title and description
   - Add screenshots if UI changed
   - Reference related issues

3. **Wait for CI checks**
   - Linting and type checking
   - Build verification
   - All checks must pass

4. **Get code review**
   - Address review comments
   - Push updates to same branch
   - PR will auto-update

5. **Merge when approved**
   - Use "Squash and merge" or "Rebase and merge"
   - Delete branch after merge (GitHub option)

### PR Checklist

- [ ] Code compiles and builds
- [ ] All CI checks pass
- [ ] Code reviewed
- [ ] No merge conflicts
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)

---

## 🚀 Deployment Workflow

### Deploying to Production

1. **Ensure develop is stable**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Run pre-deployment checks**
   ```bash
   npm run pre-deploy
   ```

3. **Create PR to main**
   - Base: `main`
   - Compare: `develop`
   - Ensure all checks pass
   - Get approval

4. **Merge PR**
   - Vercel will automatically deploy
   - Monitor deployment in Vercel dashboard

### Hotfix Deployment

For urgent production fixes:

```bash
# Create hotfix from main
Create-Hotfix "fix-description"

# Make fix, commit, push
git add .
git commit -m "fix: description"
git push origin hotfix/fix-description

# Create PR to main (fast-track)
# After merging to main, also merge to develop
Sync-Develop
```

---

## 🔧 Development Tools

### VS Code (Recommended)

Recommended extensions:
- ESLint
- Prettier (if using)
- TypeScript and JavaScript Language Features
- GitLens
- Tailwind CSS IntelliSense

See `.vscode/extensions.json` for recommended extensions.

### Browser DevTools

- **React DevTools** - Debug React components
- **RainbowKit DevTools** - Debug wallet connections
- **Network tab** - Monitor API calls
- **Console** - Check for errors/warnings

---

## 🐛 Debugging

### Common Issues

#### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Type Errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/path/to/file.tsx
```

#### Linting Errors

```bash
# See all linting errors
npm run lint

# Auto-fix (where possible)
npm run lint -- --fix
```

#### Wallet Connection Issues

- Check browser console for errors
- Verify network configuration in RainbowKit
- Check wallet is unlocked
- Try different wallet provider

---

## 📚 Project Structure

```
ricobenzia_home/
├── .github/
│   └── workflows/      # CI/CD workflows
├── public/             # Static assets
├── scripts/            # Helper scripts
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and configs
│   ├── routes/         # Route components
│   ├── data/           # Static data
│   └── ...
└── ...
```

---

## 🔐 Environment Variables

Create `.env.local` for local development:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

**Never commit `.env` files!** They're in `.gitignore`.

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run pre-deploy` passes
- [ ] Tested in browser (Chrome, Firefox, Safari)
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Wallet connection tested
- [ ] No console errors
- [ ] Environment variables set in Vercel
- [ ] Documentation updated (if needed)
- [ ] Code reviewed and approved

---

## 🎯 Best Practices

1. **Keep branches small and focused**
   - One feature per branch
   - Easier to review and test

2. **Commit often, push regularly**
   - Small, logical commits
   - Push for backup

3. **Write descriptive commit messages**
   - Follow conventional commits
   - Explain what and why

4. **Test before creating PR**
   - Run build locally
   - Test functionality
   - Check for errors

5. **Use PR descriptions**
   - Explain what changed
   - Include screenshots
   - Reference issues

6. **Monitor CI/CD**
   - Check GitHub Actions after push
   - Monitor Vercel deployments
   - Verify production after merge

---

## 📖 Additional Resources

- [Git Workflow Guide](./GIT_WORKFLOW.md)
- [Workflow Setup Instructions](./WORKFLOW_SETUP.md)
- [Quick Start Guide](./QUICK_START.md)
- [Deployment Notes](./DEPLOYMENT_NOTES.md)

---

## 🆘 Getting Help

- Check existing documentation
- Review error messages carefully
- Check GitHub Issues
- Consult team members

---

**Happy coding! 🚀**
