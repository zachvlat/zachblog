---
title: "Alpine"
date: "2025-06-19"
slug: "alpine"
---

## If you want all
`apk add nano git curl wget openssh build-base bash flatpak streamlink lazydocker docker docker-cli docker-compose python3 py3-pip nodejs npm shadow go openjdk21 py3-virt
ualenv yt-dlp btop newsboat yazi mpv ffmpeg lscpu`

## General
`apk add nano git curl wget openssh build-base bash`

## SSH
`ssh-keygen -A`  
`rc-service sshd start`  
`rc-update add sshd`  
`vi /etc/ssh/sshd_config`  
`iptables -A INPUT -p tcp --dport 22 -j ACCEPT`  
`ip addr`  
  
## Rust environment
`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`  
`source $HOME/.cargo/env`
  
## Python environment
`apk add python3 py3-pip`
  
## Java environment
`apk add openjdk17`  
`export JAVA_HOME=/usr/lib/jvm/java-17-openjdk`  
For other jdks search with `apk search` openjdk
  
## Nodejs (react/react native)
`apk update && apk add nodejs npm shadow`  
`npm install -g eas-cli`
  
## Go
`apk add go`
  
## Docker
`apk add lazydocker docker docker-cli docker-compose`  
`dockerd &`
  
## Various tui tools
`apk add yt-dlp btop newsboat yazi streamlink mpv ffmpeg`  
`mpv --no-video --ytdl-format=bestaudio 'https://www.youtube.com/playlist?list=PLE6zR7e3x7EqucxPrDxwiN-GQnEbabygq'`  
`streamlink --player "/mnt/c/Program Files/VideoLAN/VLC/vlc.exe" https://www.twitch.tv/vadikus007 480p`  
`git clone https://github.com/ayn2op/discordo`  
`cd discordo`  
`go main.go`
