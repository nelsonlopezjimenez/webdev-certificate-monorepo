# Prompt
cmd batch file, manual run when needed, console.log display, scope all for the first run, then symlinks only; report all findings each time for now.

## **Two batch files for you:**


## **File 1: `security_scan_full.cmd` (complete scan)**

```sh
@echo off
echo ============================================
echo SECURITY SCAN - FULL
echo ============================================
echo.

echo [1/5] Checking for symlinks and junctions...
echo ----------------------------------------
dir /AL /S C:\Users 2>nul | findstr /i "<SYMLINKD> <JUNCTION>"
echo.

echo [2/5] Reviewing scheduled tasks...
echo ----------------------------------------
schtasks /query /fo LIST /v | findstr /i /c:"TaskName:" /c:"Author:" /c:"Task To Run:"
echo.

echo [3/5] Checking startup entries...
echo ----------------------------------------
echo HKCU Run:
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" 2>nul
echo.
echo HKLM Run:
reg query "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" 2>nul
echo.
echo Startup folder:
dir /b "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup" 2>nul
echo.

echo [4/5] Checking for SSH server (port 22)...
echo ----------------------------------------
netstat -ano | findstr :22
if errorlevel 1 echo No SSH connections detected
echo.

echo [5/5] Checking %PUBLIC% and user temp for suspicious files...
echo ----------------------------------------
dir /s /b "%PUBLIC%\*.exe" "%PUBLIC%\*.bat" "%PUBLIC%\*.ps1" 2>nul
dir /s /b "%TEMP%\*.exe" 2>nul
echo.

echo ============================================
echo SCAN COMPLETE
echo ============================================
pause
```


## **File 2: `security_scan_symlinks.cmd` (symlinks only)**

```sh
@echo off
echo ============================================
echo SECURITY SCAN - SYMLINKS ONLY
echo ============================================
echo.

echo Scanning for symlinks and junctions in user directories...
echo.
dir /AL /S C:\Users 2>nul | findstr /i "<SYMLINKD> <JUNCTION>"
echo.

echo Scanning %PUBLIC%...
echo.
dir /AL /S %PUBLIC% 2>nul | findstr /i "<SYMLINKD> <JUNCTION>"
echo.

echo ============================================
echo SCAN COMPLETE
echo ============================================
echo.
echo Review any unexpected links to:
echo  - C:\Windows or System32
echo  - Other users' folders
echo  - %PROGRAMFILES% or registry paths
echo.
pause
```


## **Usage:**

```sh
@REM First time - full scan
security_scan_full.cmd

@REM Regular monitoring - symlinks only
security_scan_symlinks.cmd
```

## **What to look for:**
- Symlinks pointing to `C:\Windows\`, `System32`, or other users
- Unknown scheduled tasks with SYSTEM privileges
- Unexpected startup entries
- Port 22 listening (SSH)
- `.exe` files in `%PUBLIC%` or `%TEMP%`

