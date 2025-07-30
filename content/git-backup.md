---
title: "Github to Gitea"
date: "2025-06-24"
slug: "git-backup"
---

```shell
#!/bin/bash

GITHUB_USERNAME=zachvlat
GITHUB_TOKEN=MYGITHUBTOKEN

GITEA_USERNAME=zatsando
GITEA_TOKEN=MYGITEATOKEN
GITEA_DOMAIN=git.zatspi.duckdns.org
GITEA_REPO_OWNER=zatsando

# === GET YOUR GITHUB PERSONAL REPOS ===
GET_REPOS=$(curl -s -u "$GITHUB_USERNAME:$GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/user/repos?per_page=200&type=owner" \
  | jq -r '.[].clone_url')

# === MIGRATE EACH TO GITEA ===
for URL in $GET_REPOS; do
  REPO_NAME=$(basename "$URL" .git)
  echo "🚀 Importing $REPO_NAME..."

  RESPONSE_CODE=$(curl -s -w "%{http_code}" -o /tmp/response.txt -X POST "https://$GITEA_DOMAIN/api/v1/repos/migrate" \
    -u "$GITEA_USERNAME:$GITEA_TOKEN" \
    -H "accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{
      \"auth_username\": \"$GITHUB_USERNAME\",
      \"auth_password\": \"$GITHUB_TOKEN\",
      \"clone_addr\": \"$URL\",
      \"mirror\": true,
      \"private\": false,
      \"repo_name\": \"$REPO_NAME\",
      \"repo_owner\": \"$GITEA_REPO_OWNER\",
      \"service\": \"git\",
      \"wiki\": true
    }")

  if [[ "$RESPONSE_CODE" -eq 201 ]]; then
    echo "✅ Successfully imported $REPO_NAME"
  else
    echo "❌ Failed to import $REPO_NAME (HTTP $RESPONSE_CODE)"
    cat /tmp/response.txt
  fi
done
