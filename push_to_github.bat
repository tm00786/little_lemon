@echo off
echo ========================================
echo Little Lemon Restaurant - Git Push Script
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Initialize git repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add all files
echo Adding files to Git...
git add .
echo.

REM Commit changes
echo Committing changes...
git commit -m "Little Lemon Restaurant API - Django REST Framework Project"
echo.

REM Add remote repository
echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/tm00786/little_lemon.git
echo.

REM Set main branch
echo Setting branch to main...
git branch -M main
echo.

REM Push to GitHub
echo Pushing to GitHub...
echo You may be prompted for your GitHub credentials...
git push -u origin main
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your repository: https://github.com/tm00786/little_lemon
    echo.
) else (
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Please check:
    echo 1. Your GitHub credentials
    echo 2. Repository exists: https://github.com/tm00786/little_lemon
    echo 3. You have write access to the repository
    echo.
)

pause
