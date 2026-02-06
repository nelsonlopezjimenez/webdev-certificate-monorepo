# webdev-certificate-monorepo

## last modified: 2.3.2026
## last modified: 8.17.2025

## 2.6.2026
Same situation as GitHub — Gitea's branch protection controls who can **push and merge** to a branch, but it doesn't hide branches. If a student has read access to the repo, they can see all branches including `solution`.

**Your best options with Gitea:**

**1. Two repos (recommended)**
- **Public repo** → `main` only (student-facing)
- **Private repo** → your working repo with `solution` branch
- The strip script + a push script syncs them

**2. Single private repo + Gitea organization teams**
- Gitea supports organization teams with different permission levels — you can give students read access to specific repos
- Keep one private repo, create a separate public repo for stripped content
- Or give students read-only access and rely on the fact that most won't bother checking other branches (not secure, just practical)

**3. Single repo, only push `main` to Gitea**
- Work locally with both branches
- Only push `main` (stripped) to the Gitea remote
- Keep `solution` local-only or push to a separate private remote

This third option is the simplest — just add two remotes:

```bash
# Your private remote (has everything)
git remote add private git@your-gitea:you/course-solutions.git

# Student-facing remote (main only)
git remote add origin git@your-gitea:you/course-public.git

# Push solution to private
git push private solution

# Hook auto-pushes stripped main to origin
git push origin main
```

Want me to update the pre-push hook to support a two-remote setup?

## Not really — that back-and-forth gets messy fast and the branches will diverge quickly, making merges painful.

**Better approaches:**

**1. Solution branch always merges FROM main (recommended)**

- Do all assignment work on `main`
- Periodically merge `main` into `solution`
- Solutions only ever get added on the `solution` branch

```
main:      A1 --- A2 --- A3
              \      \      \
solution:      A1+S1  A2+S2  A3+S3
```

```bash
# Add assignment on main
git checkout main
# ... add assignment, commit

# Switch to solution, merge main in, add solution
git checkout solution
git merge main
# ... add solution files, commit
```

This keeps `solution` as a superset of `main` — always in sync, never conflicts.

**2. Separate solutions repo entirely**
- One public repo (students can see/clone)
- One private repo with solutions
- Less Git complexity but two repos to maintain

**3. Single repo with a `SOLUTIONS/` folder + `.gitignore` on main**
- Keep solutions in a folder that's only tracked on the `solution` branch
- Requires discipline but everything lives together

**Option 1 is the most common pattern** for course repos. The key rule: **never merge solution → main**, always **main → solution**. That one-way flow keeps things clean.

Want me to set up the initial branch structure for this?

## 2.5.2026
1. main/solution branches in gitea/github 
1. both branches diverging fast
1. First approach to merge:
    1. Cherry-pick specific commits (best if the non-solution work is in separate commits)
```bash
    git checkout main
    git cherry-pick <commit-hash>
```
     1. Merge then remove unwanted files
 ```bash
    git checkout main
    git merge solution --no-commit
    git reset HEAD -- path/to/solution-files/
    git checkout -- path/to/solution-files/
    git commit -m "Merge solution branch without solution files"
```
    1. Use checkout to pull specfic files
```bash
    git checkout main
    git checkout colution -- path/to/files1 path/to/file2 (or -- **SOLUTION* or similar glob)
    git commit -m "Bring in specific files from solution branch"
```
1. if a solution is inside SOLUTION folder:
```bash
    git checkout main
    git merge solution --no-commit
    git reset HEAD -- SOLUTION/
    git checkout -- SOLUTION
    git commit -m "Merge solution branch without SOLUTION folder"
```
1. This merges everything, unstages the SOLUTION/ folder, restores it to main's version, then commit. 


## 8.17.2025

1. cis-244-246: recipe-app-2025
    1. Frontend starting code has an object to pass the hardcoded recipe array and the id number for each recipe.
    1. The logic is to add new recipes to the array and increase the id number by one
    1. The app is not connected to the backend yet.
    1. The problem for students is to figure out how to deal with the array inside and/or outside the object and how to elimitate the id number when connecting to the backend when mongo assigns a unique id.
    1. PLAN: refactor the starting app to have an array instead of an object and to add separately the id and then eliminate it easily

## 5.11.2025
1. https://www.robinwieruch.de/web-applications/
1. https://www.reddit.com/r/reactjs/comments/rm48bc/what_is_storybook_used_for/

## 5.10.2025

## bash command line piping dir content to md file

``` sh
$ for i in *.*; do echo "## item "; echo $i; echo "<pre>"; cat $i; echo "</pre>";echo ; done > all.md
```


## Quick setup — if you’ve done this kind of thing before

1. Set up in Desktop
1. or
1. HTTPS or SSH
1. git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.

## …or create a new repository on the command line
1. echo "# webdev-certificate-monorepo" >> README.md
1. git init
1. git add README.md
1. git commit -m "first commit"
1. git branch -M main
1. git remote add origin git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. git push -u origin main

## …or push an existing repository from the command line
1. git remote add origin git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. git branch -M main
1. git push -u origin main
