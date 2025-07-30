---
title: "Fetch"
date: "2025-07-13"
slug: "fetch"
---

```bash

#!/bin/bash

# Colors
LABEL_COLOR="\e[1;35m"  # Magenta
RESET="\e[0m"

# System info (same as you wrote)
OS=$(source /etc/os-release && echo "$PRETTY_NAME")
KERNEL=$(uname -r)
UPTIME=$(uptime -p | sed 's/up //')
SHELL=$(basename "${SHELL:-$(getent passwd "$USER" | cut -d: -f7)}")
CPU=$(lscpu | grep "Model name" | cut -d':' -f2 | xargs)
MEMORY=$(free -h | awk '/^Mem:/ {print $3 " / " $2}')

if command -v pacman &>/dev/null; then
    PKGS=$(pacman -Qq | wc -l)
elif command -v dpkg &>/dev/null; then
    PKGS=$(dpkg-query -f '${binary:Package}\n' -W | wc -l)
elif command -v rpm &>/dev/null; then
    PKGS=$(rpm -qa | wc -l)
else
    PKGS="Unknown"
fi

FLATPAKS=$(flatpak list --app --columns=application 2>/dev/null | wc -l)
[ -z "$FLATPAKS" ] && FLATPAKS=0

GPU=$(lspci | grep -E "VGA|3D|Display" | sed -e 's/.*: //' -e 's/ (rev.*)//' | paste -sd ', ')

HOSTNAME=$(cat /proc/sys/kernel/hostname)
USER_HOST="${USER}@${HOSTNAME}"

readarray -t ASCII_ART_LINES << "EOF"
       .---.
      /     \    ."""""""""""""".
      \.@-@./    | Linux Rules! |
      /`\_/`\ ___'..............'
     //  _  \\
    | \     )|_
   /`\_`>  <_/ \
   \__/'---'\__/
EOF

wrap() {
    local label="$1"
    local text="$2"
    local width=50
    local label_len=${#label}
    local label_colored="${LABEL_COLOR}${label}${RESET}"
    local indent="$(printf '%*s' "$((label_len + 1))")"
    local result=()
    local first_line_len=$((width - label_len))

    result+=("${label_colored}${text:0:first_line_len}")
    text="${text:first_line_len}"

    while [[ -n "$text" ]]; do
        result+=("${indent}${text:0:width}")
        text="${text:width}"
    done

    printf "%b\n" "${result[@]}"
}

INFO_LINES=(
    "$(printf "${LABEL_COLOR}User:${RESET} %s" "$USER_HOST")"
    "$(printf "${LABEL_COLOR}OS:${RESET} %s" "$OS")"
    "$(printf "${LABEL_COLOR}Kernel:${RESET} %s" "$KERNEL")"
    "$(printf "${LABEL_COLOR}Uptime:${RESET} %s" "$UPTIME")"
    "$(printf "${LABEL_COLOR}Shell:${RESET} %s" "$SHELL")"
)

while IFS= read -r line; do INFO_LINES+=("$line"); done < <(wrap "CPU: " "$CPU")
while IFS= read -r line; do INFO_LINES+=("$line"); done < <(wrap "GPU: " "$GPU")

INFO_LINES+=(
    "$(printf "${LABEL_COLOR}Memory:${RESET} %s" "$MEMORY")"
    "$(printf "${LABEL_COLOR}Packages:${RESET} %s" "$PKGS")"
    "$(printf "${LABEL_COLOR}Flatpaks:${RESET} %s" "$FLATPAKS")"
)

for ((i = 0; i < ${#ASCII_ART_LINES[@]}; i++)); do
    ASCII_ART_LINES[i]=$(printf "%-33s" "${ASCII_ART_LINES[i]}")
done

MAX_LINES=${#ASCII_ART_LINES[@]}
[ ${#INFO_LINES[@]} -gt $MAX_LINES ] && MAX_LINES=${#INFO_LINES[@]}

for ((i = 0; i < MAX_LINES; i++)); do
    LEFT="${ASCII_ART_LINES[i]}"
    RIGHT="${INFO_LINES[i]}"
    printf "%b%-33s%b  %s\n" "$LABEL_COLOR" "$LEFT" "$RESET" "$RIGHT"
done

