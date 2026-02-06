There are a few common approaches depending on your situation:

**1. Cherry-pick specific commits** (best if the non-solution work is in separate commits)
```bash
git checkout main
git cherry-pick <commit-hash>
```

**2. Merge then remove the unwanted files** (quick and straightforward)
```bash
git checkout main
git merge solution --no-commit
git reset HEAD -- path/to/solution-files/
git checkout -- path/to/solution-files/
git commit -m "Merge solution branch without solution files"
```

**3. Use `checkout` to pull specific files** (best if you know exactly which files you want)
```bash
git checkout main
git checkout solution -- path/to/file1 path/to/folder/
git commit -m "Bring in specific files from solution branch"
```

**Key question:** Are the solution files in a predictable path (like a `solutions/` folder) or scattered throughout the repo? That determines which approach is cleanest.

If they follow a naming pattern, option **2** with `git reset HEAD -- **/solution*` (or similar glob) is usually the most practical. If you want specific files, option **3** is the most surgical.