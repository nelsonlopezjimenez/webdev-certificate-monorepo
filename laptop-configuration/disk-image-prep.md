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