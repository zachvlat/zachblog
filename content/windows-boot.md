---
title: "Windows Boot Partition"
date: "2024-06-19"
slug: "windows-boot"
---

# How to Create a Windows Boot Manager Partition

## Steps to Create the Partition

1. **Boot into Windows**.
2. Open the **Start Menu** and type `diskmgmt.msc`.
3. Click on the **Disk Management** icon.
4. In the **Disk Management** window:
   - Right-click on an **unallocated space** on your hard drive.
   - Select **New Simple Volume**.
5. In the **New Simple Volume Wizard**:
   - Enter the size of the partition (recommended: **at least 250 MB**).
   - Click **Next**.
6. In the **File system selection** window:
   - Select **FAT32**.
   - Click **Next**.
7. In the **Assign drive letter or path** window:
   - Leave the drive letter **blank**.
   - Click **Next**.
8. In the **Format volume** window:
   - Leave the default settings.
   - Click **Finish**.
9. Once the partition is created:
   - Right-click on it and select **Set Active**.
10. Close the **Disk Management** window.

## Install Windows Boot Manager

1. Open **Command Prompt as Administrator**.
2. Run the following command:
   ```cmd
   bcdboot C:\Windows /s S: /f UEFI
3. Replace C:\Windows with your Windows installation directory (if different).
4. Replace S: with the drive letter of the new boot partition.

Important Notes

    The boot partition must be:

        At least 250 MB in size.

        Formatted as FAT32.

        Set as Active.

    If unsure, consult a technical support professional.

Your computer will now boot from the new partition by default.


### How to Use This Markdown
1. Copy the entire block above.
2. Paste it into a `.md` file or a Markdown-supported editor (e.g., VS Code, Typora, or GitHub README).
3. The formatting (headers, lists, code blocks) will render automatically. 

Let me know if you'd like any modifications!

