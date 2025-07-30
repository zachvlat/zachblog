---
title: "MacOS KDE"
date: "2025-07-04"
slug: "kde-macos"
---

```
#!/bin/bash

# Restart plasmashell
killall plasmashell
kstart plasmashell &
sleep 2

# Define favorite apps
FAVORITE_APPS=("org.kde.dolphin.desktop" "firefox.desktop" "org.kde.konsole.desktop" "systemsettings.desktop")
FAVORITE_LAUNCHERS=$(printf "application:%s," "${FAVORITE_APPS[@]}")
FAVORITE_LAUNCHERS=${FAVORITE_LAUNCHERS%,}

# Create the JavaScript layout
LAYOUT_SCRIPT=$(cat <<EOF
var desktops = desktops();
var panels = desktops[0].panels;
for (var i = 0; i < panels.length; ++i) {
    panels[i].remove();
}

// --- Top Panel ---
var top = new Panel;
top.location = 'top';
top.height = 30;
top.addWidget('org.kde.plasma.activewindowcontrol');
top.addWidget('org.kde.plasma.applicationtitle');
top.addWidget('org.kde.plasma.systemtray');
top.addWidget('org.kde.plasma.digitalclock');

// --- Bottom Dock ---
var dock = new Panel;
dock.location = 'bottom';
dock.height = 48;
dock.hiding = 'autohide';

var tasks = dock.addWidget('org.kde.plasma.icontasks');
tasks.currentConfigGroup = ['General'];
tasks.writeConfig('launchers', '${FAVORITE_LAUNCHERS}');
tasks.writeConfig('iconSize', 48);
tasks.writeConfig('groupingStrategy', 0);
tasks.writeConfig('onlyShowCurrentDesktop', true);
top.reloadConfig();
dock.reloadConfig();
EOF
)

# Apply layout using dbus-send
dbus-send --session \
  --dest=org.kde.plasmashell \
  --type=method_call \
  --print-reply \
  /PlasmaShell org.kde.PlasmaShell.evaluateScript \
  string:"$LAYOUT_SCRIPT"

# Enable dynamic wallpaper-based accent color
kwriteconfig6 --file kdeglobals --group General --key AccentColorFromWallpaper true
kwriteconfig6 --file kdeglobals --group General --key ColorScheme "Breeze"

# Ensure Breeze theme and rounded corners
kwriteconfig6 --file kwinrc --group org.kde.kdecoration2 --key Library "org.kde.kwin.aurorae"
kwriteconfig6 --file kdeglobals --group KDE --key LookAndFeelPackage "org.kde.breeze.desktop"
kwriteconfig6 --file kdeglobals --group KDE --key BackgroundContrast 1

# Reload KDE configs
dbus-send --session --dest=org.kde.KWin --type=method_call /KWin org.kde.KWin.reconfigure
dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.refreshCurrentShell

echo "✅ macOS-style KDE Plasma 6 layout applied with rounded corners and dynamic wallpaper colors!"
