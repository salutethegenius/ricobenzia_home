#!/usr/bin/env node

/**
 * Pre-Deployment Check Script
 * Runs before deploying to production to ensure everything is ready
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCheck(name, command, critical = true) {
  try {
    log(`⏳ Running: ${name}...`, 'cyan');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${name} passed\n`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${name} failed\n`, 'red');
    if (critical) {
      return false;
    }
    return true; // Non-critical failures are warnings
  }
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} exists`, 'green');
    return true;
  } else {
    log(`❌ ${description} not found: ${filePath}`, 'red');
    return false;
  }
}

function checkEnvFile() {
  const envExample = '.env.example';
  const envLocal = '.env.local';
  const env = '.env';
  
  // Check if .env.example exists (best practice)
  if (fs.existsSync(envExample)) {
    log(`✅ .env.example found (good practice)`, 'green');
  } else {
    log(`⚠️  .env.example not found (consider adding one)`, 'yellow');
  }
  
  // Warn if .env files are tracked (they shouldn't be)
  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    if (!gitignore.includes('.env') && !gitignore.includes('.env.local')) {
      log(`⚠️  Warning: .env files might not be in .gitignore`, 'yellow');
    }
  }
  
  return true;
}

log('\n🔍 Running Pre-Deployment Checks...\n', 'cyan');
log('=' .repeat(50), 'cyan');

let allPassed = true;
const checks = [];

// Check 1: Build
checks.push({
  name: 'Build check',
  fn: () => runCheck('Build', 'npm run build', true),
  critical: true
});

// Check 2: Lint (non-critical but recommended)
checks.push({
  name: 'Lint check',
  fn: () => runCheck('Lint', 'npm run lint', false),
  critical: false
});

// Check 3: Build output exists
checks.push({
  name: 'Build output check',
  fn: () => {
    if (!fs.existsSync('dist')) {
      log('❌ Build output (dist/) not found', 'red');
      return false;
    }
    
    const distFiles = fs.readdirSync('dist');
    if (distFiles.length === 0) {
      log('❌ Build output directory is empty', 'red');
      return false;
    }
    
    log(`✅ Build output exists (${distFiles.length} items)`, 'green');
    return true;
  },
  critical: true
});

// Check 4: Required files
checks.push({
  name: 'Required files check',
  fn: () => {
    const requiredFiles = [
      { path: 'package.json', desc: 'package.json' },
      { path: 'index.html', desc: 'index.html' },
      { path: 'vite.config.ts', desc: 'vite.config.ts' }
    ];
    
    let allExist = true;
    requiredFiles.forEach(file => {
      if (!checkFileExists(file.path, file.desc)) {
        allExist = false;
      }
    });
    
    return allExist;
  },
  critical: true
});

// Check 5: Environment files
checks.push({
  name: 'Environment files check',
  fn: checkEnvFile,
  critical: false
});

// Check 6: Git status (warn if uncommitted changes)
checks.push({
  name: 'Git status check',
  fn: () => {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        log('⚠️  Warning: You have uncommitted changes', 'yellow');
        log('   Consider committing or stashing before deployment', 'yellow');
      } else {
        log('✅ No uncommitted changes', 'green');
      }
      return true;
    } catch (error) {
      // Not a git repo or git not available - not critical
      log('⚠️  Could not check git status', 'yellow');
      return true;
    }
  },
  critical: false
});

// Run all checks
checks.forEach(check => {
  const passed = check.fn();
  if (!passed && check.critical) {
    allPassed = false;
  }
});

log('\n' + '='.repeat(50), 'cyan');

if (allPassed) {
  log('\n✅ All critical checks passed! Ready for deployment.', 'green');
  log('\n💡 Next steps:', 'cyan');
  log('   1. Review your changes');
  log('   2. Create PR from develop to main');
  log('   3. Wait for CI checks to pass');
  log('   4. Get approval and merge');
  log('   5. Monitor Vercel deployment\n');
  process.exit(0);
} else {
  log('\n❌ Some critical checks failed. Please fix before deploying.', 'red');
  log('\n💡 Fix the issues above and run: npm run pre-deploy\n', 'yellow');
  process.exit(1);
}
