---
title: "Brave Policies"
date: "2025-06-26"
slug: "brave-policies"
---

======================================
```bash
#!/usr/bin/env bash

set -e

URL="https://gist.githubusercontent.com/zachvlat/494da080219452bc3b5173b491011f56/raw/aa5c5ae03ccb694c901d92f308ca8a5289e04d57/slimbrave.json"

POLICY_DIR="$HOME/.var/app/com.brave.Browser/config/brave/policies/managed"
POLICY_FILE="$POLICY_DIR/slimbrave.json"

echo "Creating Brave Flatpak policy directory..."
mkdir -p "$POLICY_DIR"

echo "Downloading slimbrave policy..."
curl -L "$URL" -o "$POLICY_FILE"

echo "Installed:"
echo "$POLICY_FILE"

echo
echo "Restart Brave completely for the policy to apply."
echo "Verify with: brave://policy"
```
======================================
```powershell
$URL = "https://gist.githubusercontent.com/zachvlat/494da080219452bc3b5173b491011f56/raw/aa5c5ae03ccb694c901d92f308ca8a5289e04d57/slimbrave.json"

$PolicyDir = "$env:ProgramFiles\BraveSoftware\Brave-Browser\Policies\Managed"

$PolicyFile = Join-Path $PolicyDir "slimbrave.json"

Write-Host "Creating Brave policy directory..."
New-Item -ItemType Directory -Force -Path $PolicyDir | Out-Null

Write-Host "Downloading slimbrave policy..."
Invoke-WebRequest -Uri $URL -OutFile $PolicyFile

Write-Host ""
Write-Host "Installed:"
Write-Host $PolicyFile

Write-Host ""
Write-Host "Restart Brave completely."
Write-Host "Verify at: brave://policy"
```
