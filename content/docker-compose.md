---
title: "Docker Compose"
date: "2025-06-19"
slug: "docker-compose"
---

```yaml
version: "3.8"

services:
  filebrowser:
    image: hurlenko/filebrowser
    container_name: filebrowser
    ports:
      - 8188:8080
    volumes:
      - /:/data
      - filebrowser_config:/config
    networks:
      - nginx_network
    restart: always

  nginxproxymanager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginxproxymanager
    ports:
      - "80:80"
      - "81:81"
      - "443:443"
    volumes:
      - nginx_data:/data
      - nginx_letsencrypt:/etc/letsencrypt
    networks:
      - nginx_network
    restart: always

  nextcloud:
    image: lscr.io/linuxserver/nextcloud:latest
    container_name: nextcloud
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Athens
    volumes:
      - nextcloud_appdata:/config
      - nextcloud_data:/data
      - nextcloud_photos:/photos
    networks:
      - nginx_network
    ports:
      - 8081:80
    restart: always

  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Athens
    volumes:
      - jellyfin_config:/config
      - /mnt/zaxdrive/Series:/data/tvshows
      - /mnt/zaxdrive/Movies/complete:/data/movies
    ports:
      - 8096:8096
      - 8920:8920
    networks:
      - nginx_network
    restart: always

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    command: -H unix:///var/run/docker.sock
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - nginx_network
    restart: always

  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    ports:
      - "4533:4533"
    environment:
      - ND_SCANSCHEDULE=1h
      - ND_LOGLEVEL=info
      - ND_SESSIONTIMEOUT=24h
      - ND_BASEURL=""
    volumes:
      - navidrome_data:/data
      - /mnt/zaxdrive/Zatsando/Music:/music:ro
    networks:
      - nginx_network
    restart: always

  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf
    container_name: audiobookshelf
    ports:
      - 13378:80
    volumes:
      - /mnt/zaxdrive/Zatsando/AudioBooks:/audiobooks
      - audiobookshelf_podcasts:/podcasts
      - audiobookshelf_metadata:/metadata
      - audiobookshelf_config:/config
    networks:
      - nginx_network
    restart: always

  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    ports:
      - 9445:80
    volumes:
      - vaultwarden_data:/data
    networks:
      - nginx_network
    restart: always

  deemix:
    image: registry.gitlab.com/bockiii/deemix-docker
    container_name: deemix
    ports:
      - 6595:6595
    environment:
      - PUID=1000
      - PGID=1000
      - UMASK_SET=022
    volumes:
      - /mnt/zaxdrive/Zatsando/Music:/downloads
      - deemix_config:/config
    networks:
      - nginx_network
    restart: always

  transmission:
    image: lscr.io/linuxserver/transmission:latest
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Athens
    volumes:
      - transmission_data:/config
      - /mnt/zaxdrive/Movies/complete:/downloads
      - transmission_watch:/watch
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    networks:
      - nginx_network
    restart: always

  pigallery2:
    image: bpatrik/pigallery2
    container_name: pigallery2
    ports:
      - 8082:80
    environment:
      - NODE_ENV=production
    volumes:
      - /mnt/zaxdrive/Camera Uploads:/app/data/photos
      - pigallery2_config:/app/data/config
    networks:
      - nginx_network
    restart: always

  homeassistant:
    container_name: homeassistant
    image: ghcr.io/home-assistant/home-assistant:stable
    volumes:
      - homeassistant_config:/config
      - /etc/localtime:/etc/localtime:ro
    networks:
      - nginx_network
    ports:
      - 8123:8123
    restart: always

  glance:
    image: glanceapp/glance
    container_name: glance
    ports:
      - 8083:80
    environment:
      - GLANCE_CONFIG_URL=https://gist.githubusercontent.com/zachvlat/b49540f253b727e221af5d105a8c8cb5/raw/2efbeaaa4b268e614b042e181406ff2aae56e2ff/home.yml
    volumes:
      - glance_data:/app/data
    networks:
      - nginx_network
    restart: always

volumes:
  filebrowser_config:
  nginx_data:
  nginx_letsencrypt:
  nextcloud_appdata:
  nextcloud_data:
  nextcloud_photos:
  jellyfin_config:
  navidrome_data:
  deemix_downloads:
  deemix_config:
  transmission_data:
  transmission_watch:
  audiobookshelf_podcasts:
  audiobookshelf_metadata:
  audiobookshelf_config:
  vaultwarden_data:
  pigallery2_config:
  homeassistant_config:
  glance_data:

networks:
  nginx_network:
    driver: bridge