---
title: "Simple Commands"
date: "2025-08-06"
slug: "simple-commands"
---

### Simple Fetch
```bash
bash <(curl -s https://gist.githubusercontent.com/zachvlat/73969463775770cb2c3e5c018a81aeff/raw/fefaba2574e31aad5f7eae2fa1eb68a8f5ce9c44/fetch.sh)
```
### Update and cleanup on Arch

```bash
sudo pacman -Syu;flatpak update -y;flatpak remove --delete-data --unused -y;sudo pacman -Scc;sudo pacman -Rns $(pacman -Qtdq);
```
### Remove kwallet

```bash
printf '[Wallet]\nEnabled=false\n' > ~/.config/kwalletrc
```

### Tailscale with local ip's

```bash
sudo tailscale up --advertise-exit-node --advertise-routes=192.168.10.0/24
```

### Update all dockers

```bash
alias check-updates='docker run --rm -e DOCKER_API_VERSION=1.54 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once --monitor-only --no-startup-message';
check-updates;
```


### Tailscale funnels

```bash
tailscale funnel --bg 8096
tailscale funnel reset
```
