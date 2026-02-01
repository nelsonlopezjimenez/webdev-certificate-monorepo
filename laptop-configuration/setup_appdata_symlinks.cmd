@echo off
setlocal enabledelayedexpansion

echo ============================================
echo AppData Symlink Setup
echo ============================================
echo.

REM Get username from parameter or prompt
set "targetUser=%~1"
if "%targetUser%"=="" (
    set /p targetUser="Enter username (e.g., s123456): "
)

if "%targetUser%"=="" (
    echo ERROR: Username required
    pause
    exit /b 1
)

echo.
echo Setting up symlinks for user: %targetUser%
echo.
echo IMPORTANT: User %targetUser% should be logged out
echo Close all applications for that user before continuing
echo.
pause

REM Check for admin/Developer Mode
fsutil dirty query %systemdrive% >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Requires admin rights or Developer Mode enabled
    echo.
    echo Options:
    echo 1. Run as Administrator
    echo 2. Enable Developer Mode in Settings
    pause
    exit /b 1
)

REM Define paths
set "userProfile=C:\Users\%targetUser%"
set "localAppData=%userProfile%\AppData\Local"
set "roamingAppData=%userProfile%\AppData\Roaming"
set "targetLocal=%PUBLIC%\bin\golden25-AppData\Local"
set "targetRoaming=%PUBLIC%\bin\golden25-AppData\Roaming"

REM Check if user profile exists
if not exist "%userProfile%" (
    echo ERROR: User profile not found: %userProfile%
    echo.
    echo Make sure the user has logged in at least once.
    pause
    exit /b 1
)

echo.
echo [1/4] Creating target directories...
echo ----------------------------------------

if not exist "%PUBLIC%\bin" mkdir "%PUBLIC%\bin"
if not exist "%PUBLIC%\bin\golden25-AppData" mkdir "%PUBLIC%\bin\golden25-AppData"
if not exist "%PUBLIC%\bin\golden25-AppData\Local" mkdir "%PUBLIC%\bin\golden25-AppData\Local"
if not exist "%PUBLIC%\bin\golden25-AppData\Roaming" mkdir "%PUBLIC%\bin\golden25-AppData\Roaming"

echo Target directories created.
echo.

echo [2/4] Backing up existing AppData...
echo ----------------------------------------

REM Move existing Local data if present
if exist "%localAppData%" (
    echo Moving Local AppData from %targetUser%...
    xcopy "%localAppData%\*" "%targetLocal%\" /E /H /C /I /Y >nul 2>&1
    if errorlevel 1 (
        echo WARNING: Some files couldn't be copied (may be in use)
    ) else (
        echo Local AppData moved successfully
    )
) else (
    echo No existing Local AppData found
)

REM Move existing Roaming data if present
if exist "%roamingAppData%" (
    echo Moving Roaming AppData from %targetUser%...
    xcopy "%roamingAppData%\*" "%targetRoaming%\" /E /H /C /I /Y >nul 2>&1
    if errorlevel 1 (
        echo WARNING: Some files couldn't be copied (may be in use)
    ) else (
        echo Roaming AppData moved successfully
    )
) else (
    echo No existing Roaming AppData found
)

echo.

echo [3/4] Removing old AppData directories...
echo ----------------------------------------

REM Rename old directories (safer than delete)
if exist "%localAppData%" (
    ren "%localAppData%" "Local.old" 2>nul
    if errorlevel 1 (
        echo ERROR: Cannot rename Local folder (files in use?)
        echo Make sure %targetUser% is logged out
        pause
        exit /b 1
    )
    echo Renamed Local to Local.old
)

if exist "%roamingAppData%" (
    ren "%roamingAppData%" "Roaming.old" 2>nul
    if errorlevel 1 (
        echo ERROR: Cannot rename Roaming folder (files in use?)
        echo Make sure %targetUser% is logged out
        pause
        exit /b 1
    )
    echo Renamed Roaming to Roaming.old
)

echo.

echo [4/4] Creating symlinks...
echo ----------------------------------------

mklink /D "%localAppData%" "%targetLocal%"
if errorlevel 1 (
    echo ERROR: Failed to create Local symlink
    pause
    exit /b 1
)
echo Created: %localAppData% -^> %targetLocal%

mklink /D "%roamingAppData%" "%targetRoaming%"
if errorlevel 1 (
    echo ERROR: Failed to create Roaming symlink
    pause
    exit /b 1
)
echo Created: %roamingAppData% -^> %targetRoaming%

echo.
echo ============================================
echo SUCCESS - Symlinks created for %targetUser%!
echo ============================================
echo.
echo AppData now at: %PUBLIC%\bin\golden25-AppData\
echo.
echo Old data preserved in:
echo   %userProfile%\AppData\Local.old
echo   %userProfile%\AppData\Roaming.old
echo.
echo Delete .old folders after verifying everything works.
echo.
pause