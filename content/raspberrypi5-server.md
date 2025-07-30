---
title: "Raspberry Pi 5 Server"
date: "2024-03-19"
slug: "raspberrypi5-server"
---

This project, titled "Zachvlat Server," is an ambitious undertaking that aims to provide a comprehensive server setup for various purposes, all managed using Docker containers and Nginx Proxy Manager. It offers an elegant solution for self-hosting services like Nextcloud, Home Assistant, Jellyfin, Transmission, Deemix, FileBrowser, and more.

## Getting Started
To get started with this project, you need to follow a few simple steps:

1. Clone the repository by running the following command: `git clone https://github.com/zachvlat/server.git`  
2. Navigate to the project directory: `cd server`  
3. Create a directory structure for Docker data: `mkdir -p nginx/data nginx/letsencrypt nextcloud/appdata nextcloud/data hass/config jellyfin/config jellyfin/tvshows jellyfin/movies jellyfin/music transmission deemix filebrowser`  
4. Edit the Docker Compose configuration file (docker-compose.yml) to customize your services.
5. Start the services: `docker-compose up -d`  
6. Following these steps, you'll have a fully functional server setup with the configured services.  

## Services
The project includes several services:

* Nextcloud: A self-hosted file sharing and collaboration platform.
* Home Assistant: An open-source home automation platform.
* Jellyfin: A personal media server software.
* Transmission: A lightweight BitTorrent client.
* Deemix: A music streaming downloader.
* FileBrowser: A web-based file manager.
* Portainer: A Docker container management tool.
