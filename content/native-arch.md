---
title: "All Native Arch"
date: "2025-07-02"
slug: "native-arch"
---

# Updating and installing Chaotic AUR repo
`sudo pacman -Syyu`  
`sudo pacman -Syu --needed chaotic-keyring chaotic-mirrorlist`  
`echo -e "\n[chaotic-aur]\nInclude = /etc/pacman.d/chaotic-mirrorlist" | sudo tee -a /etc/pacman.conf`  
`sudo pacman -Sy`  
`yes | sudo pacman -S`
# Core / General Applications
`sudo pacman -S git ufw sshfs wget unzip firefox libreoffice-fresh discord vlc qbittorrent telegram-desktop thunderbird flameshot celluloid heroic-games-launcher-bin visual-studio-code-bin moonlight-qt signal-desktop freetube rustdesk-bin parsec-bin protonvpn-gui chatterino2 openrgb`
# 🟦 KDE Applications
`sudo pacman -S kdeconnect kate konsole kalk krita kolourpaint gwenview kcolorchooser`
# 🟩 GNOME Applications
`sudo pacman -S gnome-calendar gnome-calculator gnome-text-editor gnome-font-viewer cartridges adw-gtk3 addwater libre-menu-editor hidamari refine newsflash blackbox-terminal valent gradience copyq pinta`
