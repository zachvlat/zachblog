---
title: "Github Backup"
date: "2025-06-19"
slug: "github-backup"
---

# Shell Script
```shell
# Your GitHub credentials
GITHUB_USERNAME="your-username"
GITHUB_TOKEN="your-token"
BACKUP_DIR="$HOME/github-backups"

mkdir -p "$BACKUP_DIR"
cd "$BACKUP_DIR" || exit 1

PER_PAGE=100
PAGE=1

echo "Fetching repositories for $GITHUB_USERNAME..."

while :; do
  # Get the clone URLs
  REPOS=$(curl -s -u "$GITHUB_USERNAME:$GITHUB_TOKEN" \
    "https://api.github.com/user/repos?per_page=$PER_PAGE&page=$PAGE" \
    | jq -r '.[].clone_url')

  [ -z "$REPOS" ] && break

  for REPO_URL in $REPOS; do
    REPO_NAME=$(basename "$REPO_URL" .git)
    # Inject token into the URL
    AUTH_REPO_URL=$(echo "$REPO_URL" | sed "s#https://#https://$GITHUB_USERNAME:$GITHUB_TOKEN@#")

    if [ -d "$REPO_NAME" ]; then
      echo "Updating $REPO_NAME..."
      cd "$REPO_NAME" && git pull && cd ..
    else
      echo "Cloning $REPO_NAME..."
      git clone "$AUTH_REPO_URL"
    fi
  done

  ((PAGE++))
done

echo "Backup complete in $BACKUP_DIR"
```
