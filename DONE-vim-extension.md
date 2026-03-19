code --install-extension vscodevim.vim
```

---

## Basic Vim Navigation (After Installing Extension)

### Normal Mode (Default)
```
h - Move left
j - Move down
k - Move up
l - Move right

w - Jump to next word
b - Jump back one word
e - Jump to end of word

0 - Jump to start of line
$ - Jump to end of line

gg - Jump to start of file
G - Jump to end of file

Ctrl+d - Scroll down half page
Ctrl+u - Scroll up half page
```

### Insert Mode (Press `i` to enter)
```
i - Insert before cursor
a - Insert after cursor
I - Insert at start of line
A - Insert at end of line
o - Insert new line below
O - Insert new line above

ESC - Return to normal mode
```

### Visual Mode (Press `v` to enter)
```
v - Visual mode (character selection)
V - Visual line mode (select whole lines)
Ctrl+v - Visual block mode (column selection)

ESC - Return to normal mode
```

---

## Common Vim Commands in VS Code

### Navigation
```
:10        - Go to line 10
/search    - Search forward for "search"
?search    - Search backward
n          - Next search result
N          - Previous search result

{          - Jump to previous paragraph
}          - Jump to next paragraph

%          - Jump to matching bracket
```

### Editing
```
dd         - Delete line
yy         - Copy (yank) line
p          - Paste below
P          - Paste above

u          - Undo
Ctrl+r     - Redo

x          - Delete character
r          - Replace character
cw         - Change word
ciw        - Change inner word
```

### Multiple Cursors (Vim Extension Feature)
```
gb         - Add cursor at next match
Ctrl+n     - Start multi-cursor (native VS Code)

// Start in NORMAL mode (cursor on this line)
const y = 10; // my comment
```

---

## Common Beginner Mistakes

### ❌ Mistake 1: Trying to navigate in Insert mode
```
In INSERT mode, pressing 'j' types 'j'
It doesn't move down!
```
**Fix:** Press ESC first, then navigate

### ❌ Mistake 2: Typing in Normal mode
```
In NORMAL mode, pressing 'i' then 'i' again
Enters insert mode, then types 'i'
```
**Fix:** Press `i` once to enter insert, then type

### ❌ Mistake 3: Forgetting which mode you're in
```
Can't figure out why keys aren't working
```
**Fix:** Look at status bar or cursor shape

---

## If You Get Stuck

**Golden Rule:** When in doubt, **spam ESC**
```
ESC ESC ESC
```

This guarantees you're in NORMAL mode. Then you can navigate or enter insert mode fresh.

---

## Mode Cheat Sheet (Print This!)
```
┌──────────────────────────────────────────┐
│          VIM MODE SWITCHING              │
├──────────────────────────────────────────┤
│                                          │
│  NORMAL → INSERT:                        │
│    i   = insert here                     │
│    a   = insert after                    │
│    I   = insert start of line            │
│    A   = insert end of line              │
│    o   = new line below                  │
│    O   = new line above                  │
│                                          │
│  INSERT → NORMAL:                        │
│    ESC     = exit insert mode            │
│    Ctrl+C  = also exits                  │
│    jj      = exit (if configured)        │
│                                          │
│  CHECK MODE:                             │
│    Status bar shows mode                 │
│    Block cursor = NORMAL                 │
│    Line cursor = INSERT                  │
│                                          │
└──────────────────────────────────────────┘

# Hybrid Approach: Best of Both Worlds
```
[
  // Quick panel navigation
  {
    "key": "ctrl+j",
    "command": "workbench.action.quickOpenNavigateNext",
    "when": "inQuickOpen"
  },
  {
    "key": "ctrl+k",
    "command": "workbench.action.quickOpenNavigatePrevious",
    "when": "inQuickOpen"
  },
  
  // File explorer with vim keys
  {
    "key": "j",
    "command": "list.focusDown",
    "when": "listFocus && !inputFocus"
  },
  {
    "key": "k",
    "command": "list.focusUp",
    "when": "listFocus && !inputFocus"
  },
  
  // Split navigation
  {
    "key": "ctrl+h",
    "command": "workbench.action.navigateLeft"
  },
  {
    "key": "ctrl+l",
    "command": "workbench.action.navigateRight"
  }
]
```

---

## Essential Vim Cheat Sheet for VS Code

### Daily Use Commands
```
NAVIGATION:
  h,j,k,l    - Left, down, up, right
  w/b        - Word forward/back
  0/$        - Line start/end
  gg/G       - File start/end
  Ctrl+d/u   - Page down/up

EDITING:
  i/a        - Insert before/after
  o/O        - New line below/above
  dd         - Delete line
  yy         - Copy line
  p/P        - Paste after/before
  u/Ctrl+r   - Undo/redo

VISUAL MODE:
  v          - Character select
  V          - Line select
  Ctrl+v     - Block select

SEARCH:
  /text      - Search forward
  n/N        - Next/previous match

SAVE/QUIT:
  :w         - Save
  :q         - Quit
  :wq        - Save and quit

  1  const a = 1;
2  const b = 2;
3  const c = 3;    ← You're here (line 3)
4  const d = 4;
5  const e = 5;
10 const j = 10;
13 const m = 13;   ← 10j takes you HERE (3 + 10 = 13)
15 const o = 15;
```

**Type `10j`:**
- Moves 10 lines **down** from current position (line 3)
- Lands on line 13

---

## Complete Comparison Table

| Command | Meaning | Example (from line 5) | Result |
|---------|---------|----------------------|---------|
| `:10` | Go to line 10 | `:10` | Line 10 |
| `:1` | Go to line 1 | `:1` | Line 1 |
| `:50` | Go to line 50 | `:50` | Line 50 |
| `10j` | Down 10 lines | `10j` | Line 15 (5+10) |
| `10k` | Up 10 lines | `10k` | Line -5 (error, can't go negative!) |
| `:+10` | Down 10 lines | `:+10` | Line 15 (5+10) |
| `:-10` | Up 10 lines | `:-10` | Line -5 (error) |

---

## Colon Commands (Absolute Line Numbers)

### Go to Specific Line
```
:10        → Line 10
:1         → Line 1 (top of file)
:$         → Last line of file
:50        → Line 50
```

### Range Commands
```
:10,20d    → Delete lines 10 through 20
:5,10s/old/new/g   → Replace in lines 5-10
:1,$s/old/new/g    → Replace in entire file (line 1 to last)
```

**Always absolute line numbers!**

---

## Normal Mode Movement (Relative)

### Count + Motion
```
10j        → Down 10 lines
10k        → Up 10 lines
10w        → Forward 10 words
10b        → Back 10 words
10l        → Right 10 characters
10h        → Left 10 characters
```

**Format:** `[count][motion]`

---

## Shortcuts for Common Lines
```
gg         → First line (same as :1)
G          → Last line (same as :$)
50G        → Line 50 (same as :50)
10gg       → Line 10 (same as :10)

TL;DR    = Too Long; Didn't Read (summary)
ELI5     = Explain Like I'm 5 (simple explanation)
RTFM     = Read The F***ing Manual (not polite!)
FYI      = For Your Information
BTW      = By The Way
IMO      = In My Opinion