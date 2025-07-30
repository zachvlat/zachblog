---
title: "Game Drive Mount"
date: "2025-06-19"
slug: "game-drive-mount"
---

```bash
#!/bin/bash

# Define the label to search for
LABEL="Games"

# Find the UUID of the partition with the label "Games"
UUID=$(blkid -o value -s UUID -l -t LABEL="$LABEL")

# Check if the UUID was found
if [ -z "$UUID" ]; then
  echo "Error: No partition found with label $LABEL"
  exit 1
fi

# Set the mount point to /media/Games
MOUNT_POINT="/media/Games"

# Create the mount point directory if it doesn't exist
if [ ! -d "$MOUNT_POINT" ]; then
  sudo mkdir -p "$MOUNT_POINT"
fi

# Backup the current fstab file
sudo cp /etc/fstab /etc/fstab.bak

# Add the new entry to the fstab file
echo "UUID=$UUID $MOUNT_POINT ext4 defaults 0 0" | sudo tee -a /etc/fstab

# Mount all filesystems mentioned in fstab
sudo mount -a

# Verify if the mount was successful
if mount | grep "$MOUNT_POINT" > /dev/null; then
  echo "The drive has been successfully mounted at $MOUNT_POINT"
else
  echo "Error: The drive could not be mounted."
fi

# Optionally, reboot the system to ensure changes take effect
# Uncomment the following line if you wish to reboot automatically
# sudo reboot
