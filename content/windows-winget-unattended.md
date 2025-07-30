---
title: "Windows Winget Unattended"
date: "2025-06-25"
slug: "windows-winget-unattended"
---

```powershell
Invoke-WebRequest -Uri  "https://objects.githubusercontent.com/github-production-release-asset-2e65be/197275130/402fff28-9290-40c6-a4e2-d2439a67b8cd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20250624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250624T134028Z&X-Amz-Expires=1800&X-Amz-Signature=41cacfb12f2af12cf5cf9c1deaaa177711b88a7a666100f17ecb3c732e779e57&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DMicrosoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle&response-content-type=application%2Foctet-stream" -OutFile 'winget.msixbundle'
Start-Process -FilePath 'winget.msixbundle'

Invoke-WebRequest -Uri 'https://github.com/IsmaelMartinez/teams-for-linux/releases/download/v2.0.17/teams-for-linux-Setup-2.0.17.exe' -OutFile 'teams.exe'
Start-Process -FilePath 'teams.exe'

Write-Host "Starting unattended installation of applications..." -ForegroundColor Cyan

foreach ($app in $apps) {
    Write-Host "`nInstalling $app..." -ForegroundColor Yellow
    winget install --id=$app $wingetFlags
$wingetFlags = "--silent --accept-package-agreements --accept-source-agreements"
>>
# List of application IDs
$apps = @(
    "Mozilla.Thunderbird",
    "Microsoft.VisualStudioCode",
    "Discord.Discord",
    "7zip.7zip",
    "Proton.ProtonDrive",
    "Open-Shell.Open-Shell-Menu",
    "TheDocumentFoundation.LibreOffice",
    "Klocman.BulkCrapUninstaller",
    "ChatterinoTeam.Chatterino",
    "Flameshot.Flameshot",
    "Git.Git",
    "HeroicGamesLauncher.HeroicGamesLauncher",
    "Ruben2776.PicView",
    "KDE.KDEConnect",
    "OpenJS.NodeJS.LTS",
    "Microsoft.WindowsTerminal",
    "Foundry376.Mailspring",
    "Notepad++.Notepad++",
    "Parsec.Parsec",
    "LizardByte.Sunshine",
    "PrestonN.FreeTube",
    "hluk.CopyQ",
    "MoonlightGameStreamingProject.Moonlight",
    "eloston.ungoogled-chromium",
    "RustDesk.RustDesk",
    "GIMP.GIMP",
    "OpenWhisperSystems.Signal",
    "Valve.Steam",
    "dremin.RetroBar",
    "Telegram.TelegramDesktop",
    "VideoLAN.VLC",
    "ProtonTechnologies.ProtonVPN",
    "OpenVPNTechnologies.OpenVPN"
)
>>
foreach ($app in $apps) {
    Write-Host "`nInstalling $app..." -ForegroundColor Yellow
    $command = "winget install --id=$app $wingetFlags"
    Invoke-Expression $command
}

Write-Host "`nAll installations attempted. Some apps may require manual steps or a reboot." -ForegroundColor Green


git config --global user.name "zachvlat"
git config --global user.email "zachariasvlatakis@gmail.com"

irm https://christitus.com/win | iex
```
