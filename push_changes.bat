@echo off
echo ========================================
echo Auto-Push Script for Katana Replica
echo ========================================
echo.

echo 1. Checking git status...
git status
echo.

echo 2. Staging all changes...
git add .
echo.

echo 3. Committing changes...
git commit -m "Standardize borders on Stock and Make pages"
echo.

echo 4. Pushing to remote...
git push
echo.

echo ========================================
echo Done! You can now switch devices.
echo ========================================
pause
