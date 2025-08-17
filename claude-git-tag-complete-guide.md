## 🏷️ **Git Tags - Complete Guide**

### What are Git Tags?

Git tags are **references that point to specific commits** in your repository's history. They're used to mark important points like release versions, milestones, or significant commits that you want to easily reference later.

Think of tags as **bookmarks** for specific commits - they give you a human-readable name instead of remembering long commit hashes.

## 🎯 **What Tags Are Used For:**

1. **Version Releases** (most common)
   - `v1.0.0`, `v2.1.3`, `release-2024-01`
   
2. **Milestones**
   - `beta-release`, `production-ready`, `feature-complete`
   
3. **Important Points**
   - `before-refactor`, `working-version`, `stable-build`

4. **Deployment Markers**
   - `deploy-staging`, `deploy-production`

## 🔧 **Creating Tags - Command Line**

### **Lightweight Tags** (Simple pointer to a commit)
```bash
# Tag the current commit
git tag v1.0.0

# Tag a specific commit
git tag v1.0.0 abc1234

# Tag with a custom name
git tag my-important-commit
```

### **Annotated Tags** (Recommended - includes metadata)
```bash
# Create annotated tag with message
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit with annotation
git tag -a v1.0.0 abc1234 -m "Release version 1.0.0"

# Create tag and open editor for detailed message
git tag -a v1.0.0
```

## 📋 **Managing Tags**

### **Viewing Tags**
```bash
# List all tags
git tag

# List tags with pattern
git tag -l "v1.*"

# Show tag information
git show v1.0.0

# List tags with commit info
git tag -n
```

### **Pushing Tags to Remote**
```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# Push all tags (alternative)
git push --tags
```

### **Deleting Tags**
```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
# OR
git push origin :refs/tags/v1.0.0
```

## 🚀 **Practical Example - Recipe App Versioning**## 📊 **Tag Types Comparison**

| Feature | Lightweight Tags | Annotated Tags |
|---------|-----------------|----------------|
| **Storage** | Just a pointer | Full Git object |
| **Metadata** | Commit only | Tagger, date, message |
| **Signing** | Not supported | Can be GPG signed |
| **Best for** | Temporary markers | Releases, important milestones |
| **Command** | `git tag v1.0` | `git tag -a v1.0 -m "message"` |

## 🎯 **Best Practices**

### **Semantic Versioning**
```bash
# Format: MAJOR.MINOR.PATCH
v1.0.0    # Initial release
v1.0.1    # Bug fix
v1.1.0    # New feature
v2.0.0    # Breaking changes
```

### **Naming Conventions**
```bash
# Version tags
v1.0.0, v2.1.3

# Release candidates
v1.0.0-rc1, v1.0.0-rc2

# Pre-releases
v1.0.0-alpha, v1.0.0-beta

# Build numbers
v1.0.0-build.123
```

### **Workflow Example**
```bash
# 1. Complete your work
git add .
git commit -m "Complete feature X"

# 2. Create and push tag
git tag -a v1.2.0 -m "Release v1.2.0: Added feature X"
git push origin main
git push origin v1.2.0

# 3. Create GitHub release (optional)
# Go to GitHub → Releases → Create new release → Select tag
```

## ⚡ **Quick Commands Summary**

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release message"

# Push tag to remote
git push origin v1.0.0

# List all tags
git tag

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Checkout specific tag
git checkout v1.0.0
```

Tags are essential for **version control**, **deployment tracking**, and **release management**. They make it easy to reference specific points in your project's history! 🚀