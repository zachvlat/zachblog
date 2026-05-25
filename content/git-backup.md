---
title: "GitHub to Gitea Migration Script"
date: "2025-06-24"
slug: "git-backup"
---

This script migrates all your GitHub repositories to a Gitea instance.
```bash
set -a; source .env; set +a; ./migrate_github_to_gitea.sh
```

```bash
#.env
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=ghp_xxxx
GITEA_USERNAME=your_gitea_username
GITEA_TOKEN=your_gitea_token
GITEA_DOMAIN=http://localhost:3000
GITEA_REPO_OWNER=your_gitea_username
```

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- Check required commands ---
for cmd in curl jq; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "❌ Required command '$cmd' not found. Please install it and try again."
        exit 1
    fi
done

# --- Auto-load .env from the script's directory ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/.env" ]; then
    set -a
    source "$SCRIPT_DIR/.env"
    set +a
fi

# --- Required environment variables ---
: "${GITHUB_USERNAME:?Set GITHUB_USERNAME env var}"
: "${GITHUB_TOKEN:?Set GITHUB_TOKEN env var}"
: "${GITEA_USERNAME:?Set GITEA_USERNAME env var}"
: "${GITEA_TOKEN:?Set GITEA_TOKEN env var}"
: "${GITEA_DOMAIN:?Set GITEA_DOMAIN env var}"          # e.g. http://192.168.10.225:3000
: "${GITEA_REPO_OWNER:?Set GITEA_REPO_OWNER env var}"  # owner in Gitea (usually your username)

# Optional: set MIRROR_MODE=true if you want the Gitea repo to stay synced with GitHub
MIRROR_MODE="${MIRROR_MODE:-false}"

# --- Fetch all personal GitHub repos (with pagination) ---
fetch_all_repos() {
    local page=1
    local repos_json='[]'
    while : ; do
        response=$(curl -sS -u "$GITHUB_USERNAME:$GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            "https://api.github.com/user/repos?per_page=100&page=${page}&type=owner")
        count=$(echo "$response" | jq 'if type=="array" then length else 0 end')
        if [[ "$count" -eq 0 ]]; then
            break
        fi
        repos_json=$(echo "$repos_json" "$response" | jq -s 'add')
        ((page++))
    done
    echo "$repos_json"
}

echo "📡 Fetching all personal GitHub repos..."
ALL_REPOS=$(fetch_all_repos)

if [[ $(echo "$ALL_REPOS" | jq 'length') -eq 0 ]]; then
    echo "❌ No repositories found or API error."
    exit 1
fi

# Extract clone_url and private status
REPO_DATA=$(echo "$ALL_REPOS" | jq -c '.[] | {clone_url, private}')

# --- Migrate each repository ---
echo "$REPO_DATA" | while IFS= read -r repo; do
    CLONE_URL=$(echo "$repo" | jq -r '.clone_url')
    IS_PRIVATE=$(echo "$repo" | jq -r '.private')
    REPO_NAME=$(basename "$CLONE_URL" .git)

    # Map GitHub visibility to Gitea boolean
    if [[ "$IS_PRIVATE" == "true" ]]; then
        GITEA_PRIVATE="true"
    else
        GITEA_PRIVATE="false"
    fi

    echo "🚀 Importing $REPO_NAME (private=$IS_PRIVATE)..."

    # Build JSON payload safely with jq
    PAYLOAD=$(jq -n \
        --arg auth_user "$GITHUB_USERNAME" \
        --arg auth_pass "$GITHUB_TOKEN" \
        --arg clone_url "$CLONE_URL" \
        --arg repo_name "$REPO_NAME" \
        --arg repo_owner "$GITEA_REPO_OWNER" \
        --argjson private "$GITEA_PRIVATE" \
        --argjson mirror "$MIRROR_MODE" \
        '{
            auth_username: $auth_user,
            auth_password: $auth_pass,
            clone_addr: $clone_url,
            mirror: $mirror,
            private: $private,
            repo_name: $repo_name,
            repo_owner: $repo_owner,
            service: "git",
            wiki: true
        }')

    # Use GITEA_DOMAIN exactly as defined (no extra scheme)
    http_code=$(curl -sS -w "%{http_code}" -o /tmp/gitea_response.json \
        -X POST "${GITEA_DOMAIN}/api/v1/repos/migrate" \
        -u "$GITEA_USERNAME:$GITEA_TOKEN" \
        -H "accept: application/json" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD")

    if [[ "$http_code" == "201" ]]; then
        echo "✅ Successfully imported $REPO_NAME"
    elif [[ "$http_code" == "409" ]]; then
        echo "⚠️  $REPO_NAME already exists on Gitea – skipping."
    else
        echo "❌ Failed to import $REPO_NAME (HTTP $http_code)"
        echo "   Response:"
        cat /tmp/gitea_response.json
        echo ""
    fi
done
