@echo off
echo ============================================
echo Install Automatic AppData Setup
echo ============================================
echo.
echo This will configure automatic junction setup for:
echo   User: %USERNAME%
echo.
echo The setup will run automatically on next login.
echo.
pause

set "scriptPath=%PUBLIC%\bin\setup_appdata_silent.cmd"

REM Verify script exists
if not exist "%scriptPath%" (
    echo ERROR: Script not found at %scriptPath%
    pause
    exit /b 1
)

REM Add to RunOnce
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce" /v "AppDataSetup" /t REG_SZ /d "\"%scriptPath%\"" /f

if errorlevel 1 (
    echo ERROR: Failed to add to RunOnce
    pause
    exit /b 1
)

echo.
echo ============================================
echo SUCCESS!
echo ============================================
echo.
echo Automatic setup configured.
echo.
echo On next login, junctions will be created automatically.
echo Check %TEMP%\appdata_setup.log for results.
echo.
pause