---
title: "Minimal Debian Stable"
date: "2024-06-19"
slug: "debian-mini"
---

# 🎮 Minimal Debian Stable

Debian is a robust and versatile operating system, but its default setup isn't optimized for gaming. This guide transforms Debian into a capable gaming platform through various optimizations and tool installations.

## 🛠️ System Preparation

### 🗑️ Removing Unnecessary Packages
```bash
sudo apt remove --purge imagemagick* firefox-esr libreoffice* akregator dragonplayer gimp gwenview juk kcalc kmail* kmouth okular konqueror sweeper kwrite kontrast kate kdepim-themeeditors xterm pim* dolphin konsole discover ark plasma-welcome khelpcenter kinfocenter partitionmanager kmag kmousetool kfind plasma-systemmonitor kwalletmana* plasma-discover -y;
sudo rm /usr/bin/spectacle;
sudo apt autoremove -y;
```

### 🏗️ Flatpak Setup
```bash
sudo apt install flatpak -y;
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo;
flatpak install --system flathub io.github.kolunmi.Bazaar -y
```
