@echo off
setlocal enabledelayedexpansion

echo ============================================
echo AppData Junction Setup (Manual)
echo ============================================
echo.
echo User: %USERNAME%
echo.
echo This will create junctions for your AppData to:
echo   %PUBLIC%\bin\golden25-AppData\
echo.
echo Benefits:
echo - Easier backup and restore
echo - Preserve data when recreating user account
echo - Centralized data location
echo.
echo IMPORTANT: Close all applications before continuing
echo.
pause

REM Check if already configured
dir /AL "%USERPROFILE%\AppData\Local" 2>nul | findstr /i "<JUNCTION>" >nul
if %errorlevel% equ 0 (
    echo.
    echo Already configured - junctions exist!
    echo.
    dir /AL "%USERPROFILE%\AppData"
    echo.
    pause
    exit /b 0
)

set "userProfile=%USERPROFILE%"
set "localAppData=%userProfile%\AppData\Local"
set "roamingAppData=%userProfile%\AppData\Roaming"
set "targetLocal=%PUBLIC%\bin\golden25-AppData\Local"
set "targetRoaming=%PUBLIC%\bin\golden25-AppData\Roaming"

echo.
echo [1/4] Creating target directories...
echo ----------------------------------------
if not exist "%PUBLIC%\bin\golden25-AppData\Local" mkdir "%PUBLIC%\bin\golden25-AppData\Local"
if not exist "%PUBLIC%\bin\golden25-AppData\Roaming" mkdir "%PUBLIC%\bin\golden25-AppData\Roaming"
echo Done.
echo.

echo [2/4] Moving existing AppData...
echo ----------------------------------------
if exist "%localAppData%" (
    echo Moving Local AppData...
    xcopy "%localAppData%\*" "%targetLocal%\" /E /H /C /I /Y /Q >nul 2>&1
    echo Local AppData moved
)

if exist "%roamingAppData%" (
    echo Moving Roaming AppData...
    xcopy "%roamingAppData%\*" "%targetRoaming%\" /E /H /C /I /Y /Q >nul 2>&1
    echo Roaming AppData moved
)
echo Done.
echo.

echo [3/4] Renaming old directories...
echo ----------------------------------------
if exist "%localAppData%" (
    ren "%localAppData%" "Local.old" 2>nul
    if errorlevel 1 (
        echo ERROR: Cannot rename Local folder (files in use?)
        echo Close all applications and try again.
        pause
        exit /b 1
    )
    echo Renamed Local to Local.old
)

if exist "%roamingAppData%" (
    ren "%roamingAppData%" "Roaming.old" 2>nul
    if errorlevel 1 (
        echo ERROR: Cannot rename Roaming folder (files in use?)
        echo Close all applications and try again.
        pause
        exit /b 1
    )
    echo Renamed Roaming to Roaming.old
)
echo Done.
echo.

echo [4/4] Creating junctions...
echo ----------------------------------------
mklink /J "%localAppData%" "%targetLocal%"
if errorlevel 1 (
    echo ERROR: Failed to create Local junction
    pause
    exit /b 1
)

mklink /J "%roamingAppData%" "%targetRoaming%"
if errorlevel 1 (
    echo ERROR: Failed to create Roaming junction
    pause
    exit /b 1
)
echo Done.
echo.

echo ============================================
echo SUCCESS!
echo ============================================
echo.
echo Junctions created:
dir /AL "%USERPROFILE%\AppData"
echo.
echo AppData now stored at: %PUBLIC%\bin\golden25-AppData\
echo.
echo Old data preserved in .old folders
echo Delete after verifying everything works.
echo.
pause