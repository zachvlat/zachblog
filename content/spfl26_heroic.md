---
title: "SP Football Life 2026 on Heroic"
date: "2026-08-03"
slug: "spfl26_heroic"
---

# SP Football Life 2026 – Winetricks & Registry (Heroic)

## Winetricks components to install (in order)

1. `dotnet48`
2. `dotnet8`  (if available)
3. `vcrun2022`
4. `unifont`
5. Set Windows version to **Windows 10** (`winecfg`)

---

## Required registry overrides (`user.reg`)

In the `[Software\\Wine\\DllOverrides]` section of the prefix’s `user.reg`, add:
"steam_api64"="native,builtin"
"ddraw"="native,builtin"
"lsteamclient"="disabled"
