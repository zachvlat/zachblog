---
title: "Gaming on Debian Stable"
date: "2024-06-19"
slug: "debian-gaming"
---

# 🎮 Gaming on Debian Stable

Debian is a robust and versatile operating system, but its default setup isn't optimized for gaming. This guide transforms Debian into a capable gaming platform through various optimizations and tool installations.

## 🛠️ System Preparation

### System Update and Basic Installations
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nala -y  # Modern APT frontend
```

### 🗑️ Removing Unnecessary Packages
```bash
sudo nala remove --purge \
    imagemagick* firefox-esr libreoffice* \
    akregator dragonplayer gimp gwenview juk \
    kcalc kmail* kmouth knotes okular konqueror \
    sweeper kwrite kontrast kate kdepim-themeeditors \
    xterm pim* -y
```

## 🎮 Essential Gaming Tools

### Core Packages Installation
```bash
sudo nala install \
    gamemode neofetch flatpak \
    xboxdrv mesa-utils android-sdk-platform-tools \
    pip pipx python-dbus-dev libglib2.0-dev \
    pipewire pkg-config kde-config-flatpak \
    zram-tools network-manager-openvpn-gnome -y
```

### 🏗️ Flatpak Setup
```bash
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

## 🚀 Gaming Applications

### Recommended Flatpak Installs
```bash
flatpak install flathub \
    com.valvesoftware.Steam \
    com.heroicgameslauncher.hgl \
    com.obsproject.Studio \
    org.mozilla.firefox \
    com.discordapp.Discord \
    com.visualstudio.code -y
```

## ⚙️ System Configuration

### Git Setup
```bash
git config --global user.name "YourName"
git config --global user.email "your@email.com"
```

### Games Drive Automount
```bash
wget https://gist.githubusercontent.com/zachvlat/7407aa5c6bd45132b320ba5d38567439/raw/14dbe0229a294137d82186f6fce5b4fcaa47479d/games-mount.sh
sudo chmod +x games-mount.sh
sudo ./games-mount.sh
```

## 🛠️ Compatibility Fixes

### Discord RPC Fix
```bash
mkdir -p ~/.config/user-tmpfiles.d
echo 'L %t/discord-ipc-0 - - - - app/com.discordapp.Discord/discord-ipc-0' > ~/.config/user-tmpfiles.d/discord-rpc.conf
systemctl --user enable --now systemd-tmpfiles-setup.service
```

### Game Launchers Path Overrides
```bash
sudo flatpak override --system --filesystem=/media/Games com.valvesoftware.Steam
sudo flatpak override --system --filesystem=/media/Games com.heroicgameslauncher.hgl
sudo flatpak override --system --env=FLATPAK_ENABLE_SDK_EXT=openjdk,node20,typescript com.visualstudio.code
```

### 🌈 OpenRGB Fix
```bash
wget https://openrgb.org/releases/release_0.9/openrgb-udev-install.sh
sudo chmod +x openrgb-udev-install.sh
./openrgb-udev-install.sh
```

## 🎉 Conclusion
This comprehensive setup transforms Debian into a gaming-ready platform with:
- Optimized system configuration
- Essential gaming tools
- Proper driver support
- Game launcher integration
- RGB lighting control

Enjoy your gaming experience on Debian! 🚀