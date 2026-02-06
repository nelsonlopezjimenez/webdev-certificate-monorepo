# Recipe App Version Management Example

# 1. Initial Release
git add .
git commit -m "Initial recipe app with basic CRUD functionality"
git tag -a v1.0.0 -m "Initial release - basic recipe CRUD"
git push origin main
git push origin v1.0.0

# 2. Feature Update
git add .
git commit -m "Add image upload functionality"
git tag -a v1.1.0 -m "Add image upload feature"
git push origin v1.1.0

# 3. Bug Fix Release
git add .
git commit -m "Fix recipe deletion bug"
git tag -a v1.1.1 -m "Hotfix: Fix recipe deletion issue"
git push origin v1.1.1

# 4. Major Update
git add .
git commit -m "Migrate to Vite, add Tailwind CSS, improve UI"
git tag -a v2.0.0 -m "Major update: Vite migration, Tailwind CSS, modern UI"
git push origin v2.0.0

# 5. Pre-release Testing
git add .
git commit -m "Add advanced search functionality"
git tag -a v2.1.0-beta -m "Beta release: Advanced search feature"
git push origin v2.1.0-beta

# View all tags
git tag -l

# View tag details
git show v2.0.0

# Check out specific version
git checkout v1.0.0

# Return to latest
git checkout main