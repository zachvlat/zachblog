---
title: "Podman with Distroshelf"
date: "2026-08-26"
slug: "podman_distroshelf"
---

podman commit android-dev android-dev-backup
podman save -o android-dev-backup.tar android-dev-backup

podman load -i android-dev-backup.tar
/home/zatsando/.var/app/com.ranfdev.DistroShelf/data/distroshelf/distrobox-bundled/distrobox create --name android-dev --image localhost/android-dev-backup:latest
