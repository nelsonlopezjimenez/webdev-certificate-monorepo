# DISK IMAGE PREPARATION STEPS:

## Ref: https://claude.ai/chat/49fc0416-e360-4c55-b5e3-7533a231496d

## 1.  As Admin, create the structure:


``` sh
mkdir C:\Users\Public\bin
mkdir C:\Users\Public\bin\golden25-AppData
mkdir C:\Users\Public\bin\golden25-AppData\Local
mkdir C:\Users\Public\bin\golden25-AppData\Roaming
```
## 1. Place all three scripts in C:\Users\Public\bin\

## 1. Configure Default User Profile (runs for ALL new users automatically):

```sh
cmd@REM Load Default User registry hive
reg load HKLM\DefaultUser C:\Users\Default\NTUSER.DAT

@REM Add RunOnce entry to Default User
reg add "HKLM\DefaultUser\Software\Microsoft\Windows\CurrentVersion\RunOnce" /v "AppDataSetup" /t REG_SZ /d "C:\Users\Public\bin\setup_appdata_silent.cmd" /f

@REM Unload hive
reg unload HKLM\DefaultUser
```

## 1. Create disk image

# AFTER DEPLOYMENT:

## Automatic (recommended):

User account created → logs in → script runs automatically → junctions created → check %TEMP%\appdata_setup.log

## Manual fallback:

User runs: C:\Users\Public\bin\setup_appdata_manual.cmd

## Add to existing user:

User runs: C:\Users\Public\bin\install_auto_setup.cmd then logout/login

## Find all symlinks/junctions
```sh
dir /A /S c:\Users
dir /AL /S %Public%
```
## Check startup locations:
```sh
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run"
reg query "HKLM\Software\Microsoft\Windows\CurrentVersion\Run"
```
## Enable auditing for symlink creation

```sh
auditpol /set /subcategory:"File System" /success:enable /failure:enable
```

# Prompt
In window as admin in local account i need to enable chrome,firefox and open port 3000 to 3009 for inbound and outbound traffic,

**Firewall rules for Chrome, Firefox, and ports 3000-3009:**

**`firewall_setup.cmd`**

```cmd
@echo off
echo ============================================
echo Windows Firewall Configuration
echo ============================================
echo.
echo This will:
echo - Allow Chrome through firewall
echo - Allow Firefox through firewall
echo - Open ports 3000-3009 (inbound/outbound)
echo.
pause

REM Check for admin rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Requires administrator privileges
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo.
echo [1/3] Adding Chrome firewall rules...
echo ----------------------------------------

REM Chrome - adjust path if installed elsewhere
netsh advfirewall firewall add rule name="Chrome Browser" dir=in action=allow program="C:\Program Files\Google\Chrome\Application\chrome.exe" enable=yes profile=any
netsh advfirewall firewall add rule name="Chrome Browser" dir=out action=allow program="C:\Program Files\Google\Chrome\Application\chrome.exe" enable=yes profile=any

REM Chrome (alternate location - user install)
netsh advfirewall firewall add rule name="Chrome Browser (User)" dir=in action=allow program="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" enable=yes profile=any
netsh advfirewall firewall add rule name="Chrome Browser (User)" dir=out action=allow program="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" enable=yes profile=any

REM Chrome (custom location from your setup)
netsh advfirewall firewall add rule name="Chrome Browser (Custom)" dir=in action=allow program="%PUBLIC%\bin\golden25-AppData\Local\Google\Chrome\Application\chrome.exe" enable=yes profile=any
netsh advfirewall firewall add rule name="Chrome Browser (Custom)" dir=out action=allow program="%PUBLIC%\bin\golden25-AppData\Local\Google\Chrome\Application\chrome.exe" enable=yes profile=any

echo Chrome rules added.
echo.

echo [2/3] Adding Firefox firewall rules...
echo ----------------------------------------

REM Firefox
netsh advfirewall firewall add rule name="Firefox Browser" dir=in action=allow program="C:\Program Files\Mozilla Firefox\firefox.exe" enable=yes profile=any
netsh advfirewall firewall add rule name="Firefox Browser" dir=out action=allow program="C:\Program Files\Mozilla Firefox\firefox.exe" enable=yes profile=any

REM Firefox (32-bit on 64-bit system)
netsh advfirewall firewall add rule name="Firefox Browser (x86)" dir=in action=allow program="C:\Program Files (x86)\Mozilla Firefox\firefox.exe" enable=yes profile=any
netsh advfirewall firewall add rule name="Firefox Browser (x86)" dir=out action=allow program="C:\Program Files (x86)\Mozilla Firefox\firefox.exe" enable=yes profile=any

echo Firefox rules added.
echo.

echo [3/3] Opening ports 3000-3009...
echo ----------------------------------------

REM Inbound rules
netsh advfirewall firewall add rule name="Dev Ports 3000-3009 (TCP In)" dir=in action=allow protocol=TCP localport=3000-3009 enable=yes profile=any
netsh advfirewall firewall add rule name="Dev Ports 3000-3009 (UDP In)" dir=in action=allow protocol=UDP localport=3000-3009 enable=yes profile=any

REM Outbound rules
netsh advfirewall firewall add rule name="Dev Ports 3000-3009 (TCP Out)" dir=out action=allow protocol=TCP localport=3000-3009 enable=yes profile=any
netsh advfirewall firewall add rule name="Dev Ports 3000-3009 (UDP Out)" dir=out action=allow protocol=UDP localport=3000-3009 enable=yes profile=any

echo Ports opened.
echo.

echo ============================================
echo SUCCESS - Firewall configured!
echo ============================================
echo.
echo Rules added:
echo - Chrome (all installation locations)
echo - Firefox (all installation locations)
echo - Ports 3000-3009 (TCP/UDP, in/out)
echo.
echo Verify with: netsh advfirewall firewall show rule name=all
echo.
pause
```

---

**Quick verification commands:**

```cmd
@REM View all firewall rules
netsh advfirewall firewall show rule name=all

@REM View specific rules
netsh advfirewall firewall show rule name="Chrome Browser"
netsh advfirewall firewall show rule name="Dev Ports 3000-3009 (TCP In)"

@REM Check firewall status
netsh advfirewall show allprofiles
```

---

**Remove rules if needed:**

**`firewall_cleanup.cmd`**

```cmd
@echo off
echo Removing firewall rules...

netsh advfirewall firewall delete rule name="Chrome Browser"
netsh advfirewall firewall delete rule name="Chrome Browser (User)"
netsh advfirewall firewall delete rule name="Chrome Browser (Custom)"
netsh advfirewall firewall delete rule name="Firefox Browser"
netsh advfirewall firewall delete rule name="Firefox Browser (x86)"
netsh advfirewall firewall delete rule name="Dev Ports 3000-3009 (TCP In)"
netsh advfirewall firewall delete rule name="Dev Ports 3000-3009 (UDP In)"
netsh advfirewall firewall delete rule name="Dev Ports 3000-3009 (TCP Out)"
netsh advfirewall firewall delete rule name="Dev Ports 3000-3009 (UDP Out)"

echo Done.
pause
```

---

**Common issues:**

1. **"Rule already exists"** - either ignore or delete first:
   ```cmd
   netsh advfirewall firewall delete rule name="Chrome Browser"
   ```

2. **Profile options:**
   - `profile=any` - all profiles (domain, private, public)
   - `profile=private` - home/work networks only
   - `profile=public` - public networks only

3. **Protocol notes:**
   - Most web dev uses TCP
   - Some tools (live reload, WebRTC) use UDP
   - Script includes both for coverage

Want these added to your disk image preparation scripts?