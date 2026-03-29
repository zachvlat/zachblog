---
title: "Alpine Server"
date: "2025-06-19"
slug: "alpine"
---

## If you want all

```bash
apk add nano git curl wget openssh build-base openssl-dev pkgconfig bash flatpak flatpak-builder streamlink lazydocker docker docker-cli docker-compose python3 py3-pip nodejs npm shadow go openjdk21 yt-dlp btop newsboat yazi mpv ffmpeg lscpu
```

## General

```bash
apk add nano git curl wget openssh build-base bash
```

## SSH

```bash
ssh-keygen -A
rc-service sshd start
rc-update add sshd
vi /etc/ssh/sshd_config
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
ip addr
```

## Rust environment

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

## Python environment

```bash
apk add python3 py3-pip
```

## Java environment

```bash
apk add openjdk17
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
```

For other JDKs search with `apk search openjdk`

## Node.js (React/React Native)

```bash
apk update && apk add nodejs npm shadow
npm install -g eas-cli
```

## Go

```bash
apk add go
```

## Docker

```bash
apk add lazydocker docker docker-cli docker-compose
dockerd &
```

## Various TUI tools

```bash
apk add yt-dlp btop newsboat yazi streamlink mpv ffmpeg
```

### Examples

Play audio from YouTube:
```bash
mpv --no-video --ytdl-format=bestaudio 'https://www.youtube.com/playlist?list=PLE6zR7e3x7EqucxPrDxwiN-GQnEbabygq'
```

Stream to VLC:
```bash
streamlink --player "/mnt/c/Program Files/VideoLAN/VLC/vlc.exe" https://www.twitch.tv/vadikus007 480p
```

Run discordo:
```bash
git clone https://github.com/ayn2op/discordo
cd discordo
go main.go
```
