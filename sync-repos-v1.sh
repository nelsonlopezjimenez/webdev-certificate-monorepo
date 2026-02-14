#!/bin/bash

# ============================================================================
# sync-repos.sh
#
# Syncs your private repo (with solutions) to 4 remotes:
#   - private-gitea   → full content (solutions + .7z)
#   - private-github  → full content (solutions + .7z)
#   - public-gitea    → stripped (no solutions, no .7z)
#   - public-github   → stripped (no solutions, no .7z)
#
# USAGE:
#   ./sync-repos.sh                    # sync to all 4 remotes
#   ./sync-repos.sh private            # push to private remotes only
#   ./sync-repos.sh public             # push stripped to public remotes only
#   ./sync-repos.sh private-gitea      # push to a specific remote
#   ./sync-repos.sh --dry-run          # preview without pushing
#   ./sync-repos.sh --status           # show remote configuration
#
# SETUP (run once):
#   git remote add private-gitea  git@your-gitea:you/webdev-certificate-monorepo-solution.git
#   git remote add private-github git@github.com:you/webdev-certificate-monorepo-solution.git
#   git remote add public-gitea   git@your-gitea:you/webdev-certificate-monorepo.git
#   git remote add public-github  git@github.com:you/webdev-certificate-monorepo.git
#
# REQUIRES:
#   - strip-solutions.js in the repo root
#   - Node.js installed
# ============================================================================

# Track failed remotes
FAILED_REMOTES=()

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Remote names (adjust if you prefer different names)
PRIVATE_GITEA="private-gitea"
PRIVATE_GITHUB="private-github"
PUBLIC_GITEA="public-gitea"
PUBLIC_GITHUB="public-github"

# Branch
BRANCH="${2:-$(git symbolic-ref --short HEAD 2>/dev/null)}"

# Strip script
STRIP_SCRIPT="strip-solutions.js"
REPLACE_MODE="todo"    # "todo", "blank", or "none"

# Files/patterns to exclude from public repos
EXCLUDE_PATTERNS=(
  "*.7z"
)

# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

info()    { echo -e "${CYAN}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()    { echo -e "${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "${RED}❌ $1${NC}"; exit 1; }

check_remote() {
  if ! git remote get-url "$1" &>/dev/null; then
    warn "Remote '$1' not configured — skipping."
    return 1
  fi
  return 0
}

# ---------------------------------------------------------------------------
# Status command
# ---------------------------------------------------------------------------
show_status() {
  echo ""
  echo -e "${CYAN}📡 Remote Configuration${NC}"
  echo "──────────────────────────────────────────────────"
  for remote in "$PRIVATE_GITEA" "$PRIVATE_GITHUB" "$PUBLIC_GITEA" "$PUBLIC_GITHUB"; do
    url=$(git remote get-url "$remote" 2>/dev/null || echo "NOT CONFIGURED")
    if [[ "$url" == "NOT CONFIGURED" ]]; then
      echo -e "  ${RED}✗${NC} $remote → $url"
    else
      echo -e "  ${GREEN}✓${NC} $remote → $url"
    fi
  done
  echo "──────────────────────────────────────────────────"
  echo -e "  Branch: ${YELLOW}$BRANCH${NC}"
  echo -e "  Strip script: $([ -f "$STRIP_SCRIPT" ] && echo "${GREEN}found${NC}" || echo "${RED}missing${NC}")"
  echo ""
  exit 0
}

# ---------------------------------------------------------------------------
# Push to private remotes (full content, as-is)
# ---------------------------------------------------------------------------
push_private() {
  local remote="$1"
  check_remote "$remote" || return 0

  info "Pushing to $remote/$BRANCH (full content)..."

  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] git push $remote $BRANCH"
    return 0
  fi

  if git push "$remote" "$BRANCH" 2>/dev/null; then
    success "$remote push complete."
  else
    warn "$remote unreachable — skipping."
    FAILED_REMOTES+=("$remote")
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# Push to public remotes (stripped solutions, no .7z)
# ---------------------------------------------------------------------------
push_public() {
  local remote="$1"
  check_remote "$remote" || return 0

  info "Pushing to $remote/$BRANCH (stripped, no .7z)..."

  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] Would strip solutions and exclude .7z files"
    echo "  [dry-run] git push $remote <filtered>:$BRANCH --force"
    success "$remote dry-run complete."
    echo ""
    return 0
  fi

  # ── Create temp branch with filtered content ──────────────────────────
  TEMP_BRANCH="_public_sync_$$"
  ORIGINAL_BRANCH="$BRANCH"

  git checkout -b "$TEMP_BRANCH" --quiet

  # ── Step 1: Strip solution markers ────────────────────────────────────
  if [ -f "$STRIP_SCRIPT" ]; then
    # Strip in place on the temp branch
    node "$STRIP_SCRIPT" . --in-place -r "$REPLACE_MODE" 2>/dev/null

    # The strip script only processes supported extensions.
    # Stage the changes.
    git add -A
  else
    warn "strip-solutions.js not found — skipping solution stripping."
  fi

  # ── Step 2: Remove excluded file patterns ─────────────────────────────
  for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    git ls-files "$pattern" 2>/dev/null | while read -r file; do
      git rm --cached -q "$file" 2>/dev/null || true
      rm -f "$file" 2>/dev/null || true
    done
  done
  git add -A

  # ── Step 3: Commit and push ───────────────────────────────────────────
  ORIG_MSG=$(git log -1 --pretty=format:"%s")

  if ! git diff --cached --quiet 2>/dev/null; then
    git commit -q -m "$ORIG_MSG"
  else
    # Even if no diff, amend to ensure clean tree
    git commit --allow-empty -q -m "$ORIG_MSG"
  fi

  if git push "$remote" "${TEMP_BRANCH}:${BRANCH}" --force 2>/dev/null; then
    success "$remote push complete (solutions stripped, .7z excluded)."
  else
    warn "$remote unreachable — skipping."
    FAILED_REMOTES+=("$remote")
  fi

  # ── Cleanup ───────────────────────────────────────────────────────────
  git checkout "$ORIGINAL_BRANCH" --quiet
  git branch -D "$TEMP_BRANCH" --quiet 2>/dev/null

  echo ""
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

TARGET="${1:-all}"
DRY_RUN=false

# Parse flags
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --status)  show_status ;;
  esac
done

# Re-parse target (skip flags)
for arg in "$@"; do
  case "$arg" in
    --dry-run|--status) ;;
    *) TARGET="$arg"; break ;;
  esac
done

# Validate
if [ -z "$BRANCH" ]; then
  error "Not on a branch (detached HEAD)."
fi

if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  error "Uncommitted changes detected. Commit or stash first."
fi

echo ""
echo -e "${CYAN}🔄 Sync Repos${NC}"
echo "──────────────────────────────────────────────────"
echo -e "  Branch:  ${YELLOW}$BRANCH${NC}"
echo -e "  Target:  ${YELLOW}$TARGET${NC}"
echo -e "  Strip:   ${YELLOW}$REPLACE_MODE${NC}"
[ "$DRY_RUN" = true ] && echo -e "  Mode:    ${YELLOW}DRY RUN${NC}"
echo "──────────────────────────────────────────────────"
echo ""

case "$TARGET" in
  all)
    push_private "$PRIVATE_GITEA"
    push_private "$PRIVATE_GITHUB"
    push_public  "$PUBLIC_GITEA"
    push_public  "$PUBLIC_GITHUB"
    ;;
  private)
    push_private "$PRIVATE_GITEA"
    push_private "$PRIVATE_GITHUB"
    ;;
  public)
    push_public "$PUBLIC_GITEA"
    push_public "$PUBLIC_GITHUB"
    ;;
  private-gitea)
    push_private "$PRIVATE_GITEA"
    ;;
  private-github)
    push_private "$PRIVATE_GITHUB"
    ;;
  public-gitea)
    push_public "$PUBLIC_GITEA"
    ;;
  public-github)
    push_public "$PUBLIC_GITHUB"
    ;;
  --dry-run)
    # Already handled, run all with dry-run
    push_private "$PRIVATE_GITEA"
    push_private "$PRIVATE_GITHUB"
    push_public  "$PUBLIC_GITEA"
    push_public  "$PUBLIC_GITHUB"
    ;;
  *)
    error "Unknown target: $TARGET\nUsage: $0 [all|private|public|private-gitea|private-github|public-gitea|public-github] [branch]"
    ;;
esac

echo ""
if [ ${#FAILED_REMOTES[@]} -eq 0 ]; then
  echo -e "${GREEN}🎉 All syncs succeeded!${NC}"
else
  echo -e "${YELLOW}⚠️  Done with ${#FAILED_REMOTES[@]} unreachable remote(s):${NC}"
  for r in "${FAILED_REMOTES[@]}"; do
    echo -e "  ${RED}✗${NC} $r"
  done
  echo ""
  echo -e "  Run ${CYAN}npm run sync${NC} again when connectivity changes."
fi
echo ""
