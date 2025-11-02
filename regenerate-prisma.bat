@echo off
echo ====================================
echo Prisma Client Regeneration Script
echo ====================================
echo.
echo This script will help regenerate Prisma Client after schema changes.
echo.
echo Step 1: Closing any running dev servers or processes...
timeout /t 2 /nobreak >nul

echo Step 2: Generating Prisma Client...
call npx prisma generate

echo.
echo Step 3: Done!
echo.
echo If you see errors about file permissions:
echo 1. Close all VSCode windows
echo 2. Stop all dev servers (Ctrl+C in terminals)
echo 3. Run this script again
echo.
pause
