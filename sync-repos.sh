#!/bin/bash

# ============================================================================
# sync-repos.sh
#
# Syncs your private repo (with solutions) to 4 remotes:
#   - private-gitea   → solutions kept, no .7z
#   - private-github  → solutions kept, no .7z
#   - public-gitea    → solutions stripped, .7z kept (offline students)
#   - public-github   → solutions stripped, no .7z
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

PRIVATE_GITEA="private-gitea"
PRIVATE_GITHUB="private-github"
PUBLIC_GITEA="public-gitea"
PUBLIC_GITHUB="public-github"

BRANCH="${2:-$(git symbolic-ref --short HEAD 2>/dev/null)}"

STRIP_SCRIPT="strip-solutions.js"
REPLACE_MODE="todo"    # "todo", "blank", or "none"

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
  echo "──────────────────────────────────────────────────────────────────"
  printf "  %-18s %-14s %-10s %s\n" "REMOTE" "SOLUTIONS" ".7Z" "URL"
  echo "──────────────────────────────────────────────────────────────────"

  show_remote_status() {
    local remote="$1" sol="$2" z7="$3"
    local url
    url=$(git remote get-url "$remote" 2>/dev/null || echo "NOT CONFIGURED")
    local icon="${GREEN}✓${NC}"
    [[ "$url" == "NOT CONFIGURED" ]] && icon="${RED}✗${NC}"
    printf "  ${icon} %-16s %-14s %-10s %s\n" "$remote" "$sol" "$z7" "$url"
  }

  show_remote_status "$PRIVATE_GITEA"  "kept"     "excluded"
  show_remote_status "$PRIVATE_GITHUB" "kept"     "excluded"
  show_remote_status "$PUBLIC_GITEA"   "stripped" "kept"
  show_remote_status "$PUBLIC_GITHUB"  "stripped" "excluded"

  echo "──────────────────────────────────────────────────────────────────"
  echo -e "  Branch: ${YELLOW}$BRANCH${NC}"
  echo -e "  Strip script: $([ -f "$STRIP_SCRIPT" ] && echo "${GREEN}found${NC}" || echo "${RED}missing${NC}")"
  echo ""
  exit 0
}

# ---------------------------------------------------------------------------
# Generic filtered push
#   $1 = remote name
#   $2 = strip solutions? (true/false)
#   $3 = exclude .7z?     (true/false)
# ---------------------------------------------------------------------------
push_filtered() {
  local remote="$1"
  local strip_solutions="$2"
  local exclude_7z="$3"

  check_remote "$remote" || return 0

  # Build description
  local desc=""
  if [ "$strip_solutions" = true ] && [ "$exclude_7z" = true ]; then
    desc="stripped, no .7z"
  elif [ "$strip_solutions" = true ]; then
    desc="stripped, .7z kept"
  elif [ "$exclude_7z" = true ]; then
    desc="solutions kept, no .7z"
  else
    desc="full content"
  fi

  info "Pushing to $remote/$BRANCH ($desc)..."

  # ── No filtering needed → simple push ───────────────────────────────
  if [ "$strip_solutions" = false ] && [ "$exclude_7z" = false ]; then
    if [ "$DRY_RUN" = true ]; then
      echo "  [dry-run] git push $remote $BRANCH"
      echo ""
      return 0
    fi

    if git push "$remote" "$BRANCH" 2>/dev/null; then
      success "$remote push complete ($desc)."
    else
      warn "$remote unreachable — skipping."
      FAILED_REMOTES+=("$remote")
    fi
    echo ""
    return 0
  fi

  # ── Filtered push → temp branch ─────────────────────────────────────
  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] Would create filtered commit ($desc)"
    echo "  [dry-run] git push $remote <filtered>:$BRANCH --force"
    echo ""
    return 0
  fi

  TEMP_BRANCH="_sync_${remote}_$$"
  ORIGINAL_BRANCH="$BRANCH"

  git checkout -b "$TEMP_BRANCH" --quiet

  # Step 1: Strip solution markers
  if [ "$strip_solutions" = true ]; then
    if [ -f "$STRIP_SCRIPT" ]; then
      node "$STRIP_SCRIPT" . --in-place -r "$REPLACE_MODE" 2>/dev/null
      git add -A
    else
      warn "strip-solutions.js not found — skipping solution stripping."
    fi
  fi

  # Step 2a: Exclude .7z files
  if [ "$exclude_7z" = true ]; then
    git ls-files "*.7z" 2>/dev/null | while read -r file; do
      git rm --cached -q "$file" 2>/dev/null || true
      rm -f "$file" 2>/dev/null || true
    done
    git add -A
  fi

  # Step 2b: Exclude SOLUTIONS folders (always on public repos)
  if [ "$strip_solutions" = true ]; then
    # Find all files under any SOLUTIONS directory at any depth
    git ls-files 2>/dev/null | grep -i "/SOLUTIONS/\|^SOLUTIONS/" | while read -r file; do
      git rm --cached -q "$file" 2>/dev/null || true
      rm -f "$file" 2>/dev/null || true
    done
    git add -A
  fi

  # Step 3: Amend HEAD commit with filtered content (no extra commit)
  ORIG_MSG=$(git log -1 --pretty=format:"%s")
  git commit --amend --allow-empty -q -m "$ORIG_MSG"

  if git push "$remote" "${TEMP_BRANCH}:${BRANCH}" --force 2>/dev/null; then
    success "$remote push complete ($desc)."
  else
    warn "$remote unreachable — skipping."
    FAILED_REMOTES+=("$remote")
  fi

  # Cleanup
  git checkout "$ORIGINAL_BRANCH" --quiet
  git branch -D "$TEMP_BRANCH" --quiet 2>/dev/null

  echo ""
}

# ---------------------------------------------------------------------------
# Remote-specific wrappers
#                              remote          strip?  no .7z?
# ---------------------------------------------------------------------------
push_private_gitea()  { push_filtered "$PRIVATE_GITEA"  false  true;  }
push_private_github() { push_filtered "$PRIVATE_GITHUB" false  true;  }
push_public_gitea()   { push_filtered "$PUBLIC_GITEA"   true   false; }
push_public_github()  { push_filtered "$PUBLIC_GITHUB"  true   true;  }

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
    push_private_gitea
    push_private_github
    push_public_gitea
    push_public_github
    ;;
  private)
    push_private_gitea
    push_private_github
    ;;
  public)
    push_public_gitea
    push_public_github
    ;;
  private-gitea)
    push_private_gitea
    ;;
  private-github)
    push_private_github
    ;;
  public-gitea)
    push_public_gitea
    ;;
  public-github)
    push_public_github
    ;;
  --dry-run)
    push_private_gitea
    push_private_github
    push_public_gitea
    push_public_github
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