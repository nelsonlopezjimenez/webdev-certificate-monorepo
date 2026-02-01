# Script Placement Structure
```
C:\Users\Public\bin\
├── setup_appdata_silent.cmd       (automatic, silent)
├── setup_appdata_manual.cmd       (manual, with prompts)
└── golden25-AppData\
    ├── Local\                     (target for junctions)
    └── Roaming\                   (target for junctions)
    
```
Why %PUBLIC%\bin (C:\Users\Public\bin)?

✅ Survives user account creation/deletion
✅ Accessible to all users
✅ Not affected by user profile cleanup
✅ You're already using it for AppData storage
✅ Persists in disk image