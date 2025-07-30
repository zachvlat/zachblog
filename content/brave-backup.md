---
title: "Brave Backup"
date: "2025-06-26"
slug: "brave-backup"
---

```python
import os
import zipfile
from datetime import datetime
import getpass

def list_profiles(base_path):
    """List Chromium profiles under the User Data directory."""
    return [d for d in os.listdir(base_path)
            if os.path.isdir(os.path.join(base_path, d)) and
            (d == 'Default' or d.startswith('Profile'))]

def zip_selected_profile(profile_path, selected_profile, output_prefix):
    """Zip a specific Chromium profile."""
    full_profile_path = os.path.join(profile_path, selected_profile)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_name = f"{output_prefix}_{selected_profile.replace(' ', '_')}_{timestamp}.zip"
    downloads = os.path.join(os.path.expanduser('~'), 'Downloads')
    zip_path = os.path.join(downloads, zip_name)

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(full_profile_path):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, start=full_profile_path)
                zipf.write(abs_path, arcname=rel_path)

    print(f"✅ Successfully zipped '{selected_profile}' to: {zip_path}")

def zip_chromium_windows_selected_profile():
    try:
        base_path = os.path.join(os.getenv('LOCALAPPDATA'), 'Chromium', 'User Data')
        if not os.path.exists(base_path):
            raise FileNotFoundError(f"Chromium user data not found at: {base_path}")

        profiles = list_profiles(base_path)
        if not profiles:
            print("No Chromium profiles found.")
            return

        print("Available Chromium profiles (Windows):")
        for i, p in enumerate(profiles, 1):
            print(f"{i}. {p}")
        choice = input("Select a profile number to zip: ")

        try:
            selected = profiles[int(choice) - 1]
        except (ValueError, IndexError):
            print("Invalid selection.")
            return

        zip_selected_profile(base_path, selected, "Chromium_Windows")

    except Exception as e:
        print(f"❌ Error: {e}")

def zip_chromium_data_flatpak():
    try:
        flatpak_path = os.path.expanduser('~/.var/app/com.github.Eloston.UngoogledChromium/config/chromium/')
        if not os.path.exists(flatpak_path):
            raise FileNotFoundError(f"Flatpak Chromium data not found at: {flatpak_path}")

        profiles = list_profiles(flatpak_path)
        if not profiles:
            print("No Chromium profiles found.")
            return

        print("Available Chromium profiles (Flatpak):")
        for i, p in enumerate(profiles, 1):
            print(f"{i}. {p}")
        choice = input("Select a profile number to zip: ")

        try:
            selected = profiles[int(choice) - 1]
        except (ValueError, IndexError):
            print("Invalid selection.")
            return

        zip_selected_profile(flatpak_path, selected, "Chromium_Linux")

    except PermissionError:
        print("❌ Permission denied. Try using sudo.")
    except Exception as e:
        print(f"❌ Error: {e}")

def zip_chromium_data_wsl():
    try:
        chromium_path = "/mnt/c/Users/zaxos/AppData/Local/Chromium/User Data"

        if not os.path.exists(chromium_path):
            raise FileNotFoundError(f"Chromium config not found at: {chromium_path}")

        profiles = list_profiles(chromium_path)
        if not profiles:
            print("No Chromium profiles found.")
            return

        print("Available Chromium profiles (WSL accessing Windows Chromium):")
        for i, p in enumerate(profiles, 1):
            print(f"{i}. {p}")
        choice = input("Select a profile number to zip: ")

        try:
            selected = profiles[int(choice) - 1]
        except (ValueError, IndexError):
            print("Invalid selection.")
            return

        downloads = "/mnt/c/Users/zaxos/Downloads"
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zip_name = f"Chromium_WSL_{selected}_{timestamp}.zip"
        zip_path = os.path.join(downloads, zip_name)

        profile_path = os.path.join(chromium_path, selected)

        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, _, files in os.walk(profile_path):
                for file in files:
                    abs_path = os.path.join(root, file)
                    rel_path = os.path.relpath(abs_path, start=profile_path)
                    zipf.write(abs_path, arcname=rel_path)

        print(f"✅ Zipped Chromium profile '{selected}' to: {zip_path}")

    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    print("Select your platform:")
    print("1. Windows (Chromium)")
    print("2. Linux (Flatpak - Ungoogled Chromium)")
    print("3. WSL (Linux-style Chromium path on Windows)")

    choice = input("Enter 1, 2, or 3: ")

    if choice == "1":
        zip_chromium_windows_selected_profile()
    elif choice == "2":
        zip_chromium_data_flatpak()
    elif choice == "3":
        zip_chromium_data_wsl()
    else:
        print("❌ Invalid choice. Please select 1, 2, or 3.")

if __name__ == "__main__":
    main()
