---
title: "Renaming episode shows"
date: "2025-08-25"
slug: "episode-renaming"
---

```bash
#!/bin/bash

# Loop through all the .mkv files in the current directory
for file in *.mkv; do
    # Use regex to extract the season and episode numbers
    if [[ $file =~ S([0-9]{2})E([0-9]{2}) ]]; then
        season=${BASH_REMATCH[1]}
        episode=${BASH_REMATCH[2]}
        
        # Construct the new filename
        new_filename="S${season}E${episode}.mkv"
        
        # Rename the file
        mv "$file" "$new_filename"
    fi
done
