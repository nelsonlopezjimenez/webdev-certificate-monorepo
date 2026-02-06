# Finding big items in repo as well in history
```
localepsilon@cis0768 MINGW64 ~/Documents/__REPO/webdev-certificate-monorepo-solution (master)
$ du -sh .git
139M    .git

localepsilon@cis0768 MINGW64 ~/Documents/__REPO/webdev-certificate-monorepo-solution (master)
$ git rev-list --objects --all | \
>   git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
>   grep '^blob' | sort -rnk3 | head -20 | \
>   awk '{printf "%.2f MB\t%s\n", $3/1048576, $4}'
49.25 MB        cis-241-art-225/all-recipes/cobbler_video.mp4
23.75 MB        cis-244-246/offline-templates/offline-templates.7z
18.06 MB        cis-244-246/vite-express-mern-social/modules.7z
9.25 MB cis-243-245/image-folder/calendar.png
8.13 MB cis-244-246/recipe-app-2025/frontend-vite-2025/nodemodules.7z
6.65 MB cis-244-246/recipe-app-2025/frontend-vite-2025/public/avocado_toast.jpg
4.42 MB cis-244-246/recipe-app-2025/backend/nodemodules.7z
2.69 MB cis-241-art-225/aspca/assignm4-aspca.zip.lab
2.19 MB cis-243-245/using-jwt/hamzakhan-securing-express-server/modules.7z
1.85 MB cis-243-245/using-jwt/hamzakhan-securing-express-server/modules.7z
1.51 MB cis-241-art-225/aspca/ASPCA-instructions-2023.docx
1.51 MB cis-241-art-225/aspca/ASPCA-instructions-2023-2026.docx
0.96 MB cis-243-245/modules.7z
0.77 MB cis-244-246/vite-express-mern-social/src/client/assets/images/unicornbike.jpg
0.73 MB cis-244-246/recipe-app-2025/frontend-vite-2025/src/steps/step-1h.png
0.65 MB books/image.png
0.63 MB cis-241-art-225/cookie-monster/intructions/2023-2026-Q1-lab-journal-instructions.docx
0.62 MB cis-241-art-225/cookie-monster/intructions/2023-Q1-lab-journal-instructions.docx
0.49 MB cis-241-art-225/cookie-monster/intructions/2026-Q1-lab-journal-instructions.docx
0.47 MB cis-241-art-225/all-recipes/Peach_Recipes
```


**Check repo size on GitHub (without cloning):**

Use the GitHub API:
```bash
curl -s https://api.github.com/repos/OWNER/REPO | grep size
```
Returns size in KB.

**Find big files in an already cloned repo:**

```bash
# Top 20 largest files in the working tree
find . -not -path './.git/*' -type f -exec du -h {} + | sort -rh | head -20

# Top 20 largest objects in Git history (finds files you deleted but are still in history)
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  grep '^blob' | sort -rnk3 | head -20 | \
  awk '{printf "%.2f MB\t%s\n", $3/1048576, $4}'
```

**Check `.git` folder size itself:**
```bash
du -sh .git
```

**Common culprits:**
- Images, videos, PDFs committed directly
- `node_modules` accidentally committed
- Build artifacts or binaries
- Large datasets

**If you find big files to remove from history**, use `git filter-repo`:
```bash
pip install git-filter-repo
git filter-repo --strip-blobs-bigger-than 10M
```

**To avoid the long clone in the first place:**
```bash
# Shallow clone (only latest commit)
git clone --depth 1 https://github.com/OWNER/REPO.git

# Or clone without full history
git clone --shallow-since="2025-01-01" https://github.com/OWNER/REPO.git
```

Want help cleaning up the specific repo?