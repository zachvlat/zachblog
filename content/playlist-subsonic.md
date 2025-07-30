---
title: "Playlist Generator"
date: "2025-07-24"
slug: "playlist-subsonic"
---

```shell
#!/bin/bash

# Base directory
BASE_DIR="/mnt/zaxdrive/Zatsando/Music"

# Audio file extensions (case-insensitive)
EXTENSIONS="mp3|flac|wav|aac|ogg|m4a"

# Loop through each subdirectory
find "$BASE_DIR" -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
    # Get the name of the folder
    folder_name="$(basename "$dir")"

    # Create the .m3u file path
    m3u_file="$dir/$folder_name.m3u"

    # Find audio files recursively, save relative paths to .m3u
    find "$dir" -type f | grep -Ei "\.($EXTENSIONS)$" | sort | while read -r song; do
        # Output relative path from the playlist directory
        realpath --relative-to="$dir" "$song"
    done > "$m3u_file"

    echo "Created playlist: $m3u_file"
done
