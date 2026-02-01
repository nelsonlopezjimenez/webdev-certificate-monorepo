@echo off
setlocal enabledelayedexpansion

REM Silent setup - logs to file for troubleshooting
set "logFile=%TEMP%\appdata_setup.log"
echo ============================================ > "%logFile%"
echo AppData Junction Setup >> "%logFile%"
echo Date/Time: %date% %time% >> "%logFile%"
echo User: %USERNAME% >> "%logFile%"
echo ============================================ >> "%logFile%"
echo. >> "%logFile%"

REM Use current logged-in user
set "userProfile=%USERPROFILE%"
set "localAppData=%userProfile%\AppData\Local"
set "roamingAppData=%userProfile%\AppData\Roaming"
set "targetLocal=%PUBLIC%\bin\golden25-AppData\Local"
set "targetRoaming=%PUBLIC%\bin\golden25-AppData\Roaming"

REM Check if already set up (junction exists)
dir /AL "%localAppData%" 2>nul | findstr /i "<JUNCTION>" >nul
if %errorlevel% equ 0 (
    echo Already configured - junction exists >> "%logFile%"
    echo Exiting... >> "%logFile%"
    exit /b 0
)

echo [1/4] Creating target directories... >> "%logFile%"
if not exist "%PUBLIC%\bin\golden25-AppData\Local" mkdir "%PUBLIC%\bin\golden25-AppData\Local" 2>>"%logFile%"
if not exist "%PUBLIC%\bin\golden25-AppData\Roaming" mkdir "%PUBLIC%\bin\golden25-AppData\Roaming" 2>>"%logFile%"
echo Target directories ready >> "%logFile%"
echo. >> "%logFile%"

echo [2/4] Moving existing AppData... >> "%logFile%"
if exist "%localAppData%" (
    echo Moving Local AppData... >> "%logFile%"
    xcopy "%localAppData%\*" "%targetLocal%\" /E /H /C /I /Y /Q >>"%logFile%" 2>&1
    echo Local AppData moved >> "%logFile%"
)

if exist "%roamingAppData%" (
    echo Moving Roaming AppData... >> "%logFile%"
    xcopy "%roamingAppData%\*" "%targetRoaming%\" /E /H /C /I /Y /Q >>"%logFile%" 2>&1
    echo Roaming AppData moved >> "%logFile%"
)
echo. >> "%logFile%"

echo [3/4] Renaming old directories... >> "%logFile%"
if exist "%localAppData%" (
    ren "%localAppData%" "Local.old" 2>>"%logFile%"
    if errorlevel 1 (
        echo ERROR: Cannot rename Local folder >> "%logFile%"
        exit /b 1
    )
    echo Renamed Local to Local.old >> "%logFile%"
)

if exist "%roamingAppData%" (
    ren "%roamingAppData%" "Roaming.old" 2>>"%logFile%"
    if errorlevel 1 (
        echo ERROR: Cannot rename Roaming folder >> "%logFile%"
        exit /b 1
    )
    echo Renamed Roaming to Roaming.old >> "%logFile%"
)
echo. >> "%logFile%"

echo [4/4] Creating junctions... >> "%logFile%"
mklink /J "%localAppData%" "%targetLocal%" >>"%logFile%" 2>&1
if errorlevel 1 (
    echo ERROR: Failed to create Local junction >> "%logFile%"
    exit /b 1
)
echo Local junction created >> "%logFile%"

mklink /J "%roamingAppData%" "%targetRoaming%" >>"%logFile%" 2>&1
if errorlevel 1 (
    echo ERROR: Failed to create Roaming junction >> "%logFile%"
    exit /b 1
)
echo Roaming junction created >> "%logFile%"

echo. >> "%logFile%"
echo ============================================ >> "%logFile%"
echo Setup completed successfully! >> "%logFile%"
echo ============================================ >> "%logFile%"

exit /b 0