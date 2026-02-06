# Course Assignments — Two-Remote Workflow

## How It Works

The `solution` branch is the single source of truth. A pre-push hook automatically strips solution code and syncs the clean version to `main`, which is the only branch students see.

```mermaid
graph TD
    subgraph LOCAL["💻 Your Local Machine"]
        SOL["🔒 solution branch<br/>assignments + solutions<br/>with SOLUTION markers"]
        HOOK["⚡ pre-push hook<br/>strip-solutions.js"]
        MAIN["📂 main branch<br/>assignments only<br/>TODO placeholders"]
        SOL -->|"git push triggers"| HOOK
        HOOK -->|"generates"| MAIN
    end

    subgraph PRIVATE["🔒 Private Gitea Repo"]
        PRSOL["solution branch<br/>full backup"]
    end

    subgraph PUBLIC["🌐 Public Gitea Repo"]
        PUBMAIN["main branch<br/>student-facing"]
    end

    SOL -->|"git push private solution"| PRSOL
    MAIN -->|"git push origin main"| PUBMAIN
    PUBMAIN -->|"git clone"| STUDENTS["👩‍🎓 Students"]
    PRSOL -.->|"🚫 no access"| STUDENTS

    style SOL fill:#1a2332,stroke:#1f6feb,color:#58a6ff
    style HOOK fill:#2a1f0e,stroke:#d29922,color:#d29922
    style MAIN fill:#0d2818,stroke:#3fb950,color:#3fb950
    style PRSOL fill:#1a2332,stroke:#1f6feb,color:#58a6ff
    style PUBMAIN fill:#0d2818,stroke:#3fb950,color:#3fb950
    style STUDENTS fill:#2a1a33,stroke:#bc8cff,color:#bc8cff
```

## Setup

### 1. Add remotes

```bash
# Private remote (your full solution backup)
git remote add private git@your-gitea:you/course-solutions.git

# Public remote (students clone this)
git remote add origin git@your-gitea:you/course-public.git
```

### 2. Install the hook

```bash
npm run setup:hooks
```

### 3. Daily workflow

```bash
git checkout solution
# edit files, add assignments with solution markers
git add -A && git commit -m "Week 3: arrays assignment"
git push private solution   # backs up full code + triggers hook → pushes main to origin
```

## Solution Markers

Use language-specific comment markers in your source files:

**JS / JSX / TS / TSX**
```js
function solve(items) {
  // === SOLUTION START ===
  return items.reduce((sum, item) => sum + item.price, 0);
  // === SOLUTION END ===
}
```

**CSS / SCSS**
```css
.container {
  /* === SOLUTION START === */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* === SOLUTION END === */
}
```

**HTML / SVG**
```html
<div id="app">
  <!-- === SOLUTION START === -->
  <h1>Hello World</h1>
  <!-- === SOLUTION END === -->
</div>
```

## npm Scripts

| Command | Description |
|---|---|
| `npm run build:student` | Generate stripped files in `./student-dist/` |
| `npm run build:student:blank` | Same but leaves blank instead of TODO |
| `npm run build:student:preview` | Dry run — shows what would be stripped |
| `npm run setup:hooks` | Install the pre-push Git hook |
