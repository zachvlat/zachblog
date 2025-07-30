---
title: "Playnite"
date: "2025-06-19"
slug: "playnite"
---

```powershell
#champR open
Start-Process "E:\Riot Games\champr.exe"

#champR close
$processId = (Get-WmiObject Win32_Process -Filter "Name = 'champr.exe'" | Select-Object ProcessId).ProcessId

if ($processId -ne $null) {
    # If the process exists, terminate it using WMI
    $wmiProcess = Get-WmiObject Win32_Process -Filter "ProcessId = $processId"
    $wmiProcess.Terminate()
} else {
    # If the process doesn't exist, log a message or take other actions as needed
    Write-Host "Application 'champr.exe' is not running."
}

#hs tracker open
Start-Process "C:\Users\ZAXOS\Documents\Hearthstone Deck Tracker\Hearthstone Deck Tracker.exe"

#hs tracker close
Stop-Process -Name "Hearthstone Deck Tracker"
