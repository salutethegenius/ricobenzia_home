# Workflow Helper Scripts for RicoBenzia Home
# Usage: Import this module or source it in your PowerShell session
# Example: . .\scripts\workflow-helpers.ps1

function Create-Feature {
    <#
    .SYNOPSIS
    Creates a new feature branch from develop
    
    .DESCRIPTION
    Ensures you're on develop, pulls latest changes, and creates a new feature branch
    
    .PARAMETER FeatureName
    The name of the feature (will be prefixed with "feature/")
    
    .EXAMPLE
    Create-Feature "add-dark-mode"
    # Creates and switches to feature/add-dark-mode
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$FeatureName
    )
    
    Write-Host "🔄 Updating develop branch..." -ForegroundColor Cyan
    git checkout develop
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to checkout develop. Does it exist?" -ForegroundColor Red
        return
    }
    
    git pull origin develop
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Warning: Failed to pull latest changes" -ForegroundColor Yellow
    }
    
    $branchName = "feature/$FeatureName"
    Write-Host "🌿 Creating feature branch: $branchName" -ForegroundColor Cyan
    git checkout -b $branchName
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Created and switched to $branchName" -ForegroundColor Green
        Write-Host "💡 Next steps:" -ForegroundColor Yellow
        Write-Host "   1. Make your changes"
        Write-Host "   2. git add ."
        Write-Host "   3. git commit -m 'feat: your message'"
        Write-Host "   4. git push origin $branchName"
        Write-Host "   5. Create PR on GitHub"
    } else {
        Write-Host "❌ Failed to create branch" -ForegroundColor Red
    }
}

function Create-Hotfix {
    <#
    .SYNOPSIS
    Creates a new hotfix branch from main
    
    .DESCRIPTION
    Creates a hotfix branch for urgent production fixes
    
    .PARAMETER FixName
    The name of the fix (will be prefixed with "hotfix/")
    
    .EXAMPLE
    Create-Hotfix "critical-bug-fix"
    # Creates and switches to hotfix/critical-bug-fix
    #>
    param(
        [Parameter(Mandatory=$true)]
        [string]$FixName
    )
    
    Write-Host "🔄 Updating main branch..." -ForegroundColor Cyan
    git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to checkout main" -ForegroundColor Red
        return
    }
    
    git pull origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Warning: Failed to pull latest changes" -ForegroundColor Yellow
    }
    
    $branchName = "hotfix/$FixName"
    Write-Host "🔥 Creating hotfix branch: $branchName" -ForegroundColor Cyan
    git checkout -b $branchName
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Created and switched to $branchName" -ForegroundColor Green
        Write-Host "💡 Next steps:" -ForegroundColor Yellow
        Write-Host "   1. Make your fix"
        Write-Host "   2. git add ."
        Write-Host "   3. git commit -m 'fix: your message'"
        Write-Host "   4. git push origin $branchName"
        Write-Host "   5. Create PR to main (fast-track approval)"
        Write-Host "   6. After merging to main, also merge to develop"
    } else {
        Write-Host "❌ Failed to create branch" -ForegroundColor Red
    }
}

function Sync-Develop {
    <#
    .SYNOPSIS
    Syncs develop branch with main
    
    .DESCRIPTION
    Updates develop with latest changes from main (useful after hotfixes)
    #>
    
    Write-Host "🔄 Syncing develop with main..." -ForegroundColor Cyan
    
    git checkout develop
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to checkout develop" -ForegroundColor Red
        return
    }
    
    git pull origin develop
    git merge main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Merge conflicts detected. Please resolve manually." -ForegroundColor Yellow
        return
    }
    
    git push origin develop
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully synced develop with main" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to push to develop" -ForegroundColor Red
    }
}

function Cleanup-Branches {
    <#
    .SYNOPSIS
    Cleans up merged branches
    
    .DESCRIPTION
    Deletes local branches that have been merged into develop
    #>
    
    Write-Host "🧹 Cleaning up merged branches..." -ForegroundColor Cyan
    
    git fetch --prune
    
    $mergedBranches = git branch --merged develop | Where-Object { 
        $_ -notmatch '^\*' -and 
        $_ -notmatch 'develop' -and 
        $_ -notmatch 'main' -and
        $_ -notmatch 'staging'
    } | ForEach-Object { $_.Trim() }
    
    if ($mergedBranches.Count -eq 0) {
        Write-Host "✅ No merged branches to clean up" -ForegroundColor Green
        return
    }
    
    Write-Host "Found merged branches:" -ForegroundColor Yellow
    $mergedBranches | ForEach-Object { Write-Host "  - $_" }
    
    $confirm = Read-Host "Delete these branches? (y/N)"
    if ($confirm -eq 'y' -or $confirm -eq 'Y') {
        $mergedBranches | ForEach-Object {
            git branch -d $_
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Deleted $_" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "❌ Cancelled" -ForegroundColor Yellow
    }
}

function Show-WorkflowStatus {
    <#
    .SYNOPSIS
    Shows current workflow status
    
    .DESCRIPTION
    Displays current branch, status, and recent commits
    #>
    
    Write-Host "`n📊 Workflow Status" -ForegroundColor Cyan
    Write-Host "==================" -ForegroundColor Cyan
    
    $currentBranch = git branch --show-current
    Write-Host "`n🌿 Current Branch: $currentBranch" -ForegroundColor Yellow
    
    Write-Host "`n📝 Status:" -ForegroundColor Yellow
    git status --short
    
    Write-Host "`n📜 Recent Commits:" -ForegroundColor Yellow
    git log --oneline --graph --all -10
    
    Write-Host "`n🔀 Branches:" -ForegroundColor Yellow
    git branch -a | Select-Object -First 10
}

# Export functions (if using as module)
Export-ModuleMember -Function Create-Feature, Create-Hotfix, Sync-Develop, Cleanup-Branches, Show-WorkflowStatus

Write-Host "✅ Workflow helper functions loaded!" -ForegroundColor Green
Write-Host "`nAvailable commands:" -ForegroundColor Cyan
Write-Host "  Create-Feature <name>     - Create a new feature branch"
Write-Host "  Create-Hotfix <name>      - Create a new hotfix branch"
Write-Host "  Sync-Develop              - Sync develop with main"
Write-Host "  Cleanup-Branches          - Clean up merged branches"
Write-Host "  Show-WorkflowStatus       - Show current workflow status"
