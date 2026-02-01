# Prompt
my goal is to setup the local account programatically without using the GUI. In addition I want the syntax to add a program on either %localappdata% location or %public% location to the local user's context menu

## **For default browser programmatically:**
```cmd
"%chromePath%" --make-default-browser
```
This is the only non-GUI method that works. It may show a brief system prompt but doesn't require Settings navigation.

---

## **For context menu (right-click) additions:**

## **Add to all files:**
```cmd
reg add "HKCU\Software\Classes\*\shell\OpenWithChrome" /ve /d "Open with Chrome" /f
reg add "HKCU\Software\Classes\*\shell\OpenWithChrome\command" /ve /d "\"%chromePath%\" \"%%1\"" /f
```

## **Add to folders:**
```cmd
reg add "HKCU\Software\Classes\Directory\shell\OpenChromeHere" /ve /d "Open Chrome here" /f
reg add "HKCU\Software\Classes\Directory\shell\OpenChromeHere\command" /ve /d "\"%chromePath%\" \"%%1\"" /f
```

## **Add to desktop background:**
```cmd
reg add "HKCU\Software\Classes\Directory\Background\shell\OpenChrome" /ve /d "Open Chrome" /f
reg add "HKCU\Software\Classes\Directory\Background\shell\OpenChrome\command" /ve /d "\"%chromePath%\"" /f
```

## **With icon:**
```cmd
reg add "HKCU\Software\Classes\*\shell\OpenWithChrome" /v Icon /t REG_SZ /d "%chromePath%,0" /f
```

## **Variables that work in command paths:**
- `%LOCALAPPDATA%` - works in registry
- `%PUBLIC%` - works in registry
- Use `%%1` for the clicked file/folder path

# Prompt
Running following: 
reg add "HKCU\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice" /v ProgId /t REG_SZ /d ChromeHTML /f ; resutlt in access denied

Yes - that's expected and cannot be bypassed. The UserChoice key is hash-protected by Windows since Windows 8.

### Use one of these instead:

#### Quick/Easy (Chrome does it properly):
```sh
cmd
"%chromePath%" --make-default-browser
```
#### Manual (opens Settings):
```sh
cmd
start ms-settings:defaultapps
```
#### Partial workaround (file associations only, not protocols):
```sh
cmd
reg add "HKCU\Software\Classes\.html" /ve /d "ChromeHTML" /f
reg add "HKCU\Software\Classes\.htm" /ve /d "ChromeHTML" /f
@echo off
reg add "HKCU\Software\Classes\.html" /ve /d "ChromeHTML" /f
reg add "HKCU\Software\Classes\.htm" /ve /d "ChromeHTML" /f
reg add "HKCU\Software\Classes\ChromeHTML\shell\open\command" /ve /d "\"%chromePath%\" -- \"%%1\"" /f
```

The --make-default-browser flag is your best option - it uses the Windows API correctly and doesn't require admin.