---
title: "Arch Pantheon"
date: "2022-06-19"
slug: "arch-pantheon"
---

# 🖥️ ArchPantheon: Bringing Elementary's Beauty to Arch Linux

![ArchPantheon Screenshot](https://i.imgur.com/zW5Wgu3.png)

## 🌟 Why ArchPantheon?

The Elementary OS Pantheon desktop environment is arguably one of the most beautiful Linux interfaces available. However:
- Elementary OS is based on an outdated Ubuntu version
- Pantheon is tightly coupled with Elementary, making it difficult to install elsewhere

After 2 months of testing, this setup has proven stable for daily use. **Warning:** Always use Timeshift for system snapshots!

## 🚀 Installation Guide

### Step 1: Install Arch Linux
- Use Ethernet for reliability during installation
- Recommended: Use the `archinstall` TUI installer
  ```bash
  archinstall
  ```
- Select:
  - **Profile:** Minimal
  - **Audio:** PulseAudio (can switch to PipeWire later)

### Step 2: Install Basic Packages

1. Update system:
   ```bash
   sudo pacman -Syy
   ```

2. Install essentials:
   ```bash
   sudo pacman -S xorg nano git
   ```

3. Install Pantheon core:
   ```bash
   sudo pacman -S pantheon pantheon-session
   ```

4. Set up login manager:
   ```bash
   sudo pacman -S lightdm lightdm-gtk-greeter lightdm-pantheon-greeter
   sudo sed -i '38s/.*/greeter-session = io.elementary-greeter/' /etc/lightdm/lightdm.conf
   ```

5. Enable services:
   ```bash
   sudo systemctl enable lightdm.service
   sudo systemctl enable NetworkManager
   sudo systemctl start lightdm.service
   ```

### Step 3: Fixing Broken Components

1. Install YAY (AUR helper):
   ```bash
   git clone https://aur.archlinux.org/yay.git
   sudo chown "$USER":users yay
   cd yay
   makepkg -si
   ```

2. Install essential fixes:
   ```bash
   yay -S pantheon-unstable gala-git switchboard-plug-pantheon-tweaks-git pantheon-print file-roller
   ```
   *(Remove conflicting dependencies when prompted)*

3. **For Dock Issues:**
   - Download [Pantheon dock theme]()
   - Extract to `~/.local/share/plank/themes/`
   - Right-click dock → Preferences → Select new theme

## 🛠️ Quality of Life Improvements

### App Indicators
```bash
yay -S wingpanel-standalone-git wingpanel-indicator-ayatana-git
```

### Audio Fixes
```bash
sudo pacman -S sof-firmware alsa-ucm-conf
```

## 💡 Pro Tips
- Set Plank (dock) to auto-start:  
  `Settings > Applications > Startup`
- Customize through `Pantheon Tweaks`
- Consider installing `pantheon-default-settings` for complete Elementary experience

## 🎉 Enjoy Your ArchPantheon!
You now have a stable, beautiful Pantheon desktop on Arch Linux's robust base. Happy computing!