---
title: "Tiny11 (my way)"
date: "2023-06-19"
slug: "tiny11-my-way"
---

# Review of "tiny11builder-no-windows-apps" Repository

🔗 **Repository URL:** [tiny11builder-no-windows-apps](https://github.com/[username]/tiny11builder-no-windows-apps)  

## 🚀 Features  

### **Removed Apps**  
This script removes the following Windows 11 built-in applications (except for forked versions):  

- Microsoft Teams  
- Windows Calculator  
- Windows Camera  
- Windows Notepad  
- Windows Photos  
- Windows Sticky Notes *(TODO)*  
- Windows Terminal  
- MSPaint *(TODO)*  
- Windows Store  
- Get Started *(TODO)*  

## ℹ️ About  

This PowerShell script creates a lightweight Windows 11 ISO by removing unnecessary built-in applications. It is based on [ntdevlabs/tiny11builder](https://github.com/ntdevlabs/tiny11builder) but includes additional improvements and customizations.

## ⚠️ DISCLAIMER  

1. **oscdimg.exe Notice:**  
   - While the repository includes `oscdimg.exe`, it's **strongly recommended** to download it yourself from the [Windows ADK](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) (link provided in README.md).  

2. **Installation Requirements:**  
   - The generated `tiny11.iso` should be installed **offline** for best results.  

3. **Administrator Privileges Required:**  
   - Always run the script in **PowerShell as Administrator**.  

4. **Output Location:**  
   - The final Windows 11 installer ISO will be saved at:  
     ```
     C:\tiny11.iso
     ```
