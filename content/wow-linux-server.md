---
title: "FOSS Wow Server on Linux"
date: "2026-08-05"
slug: "wow-linux-server"
---

# Running the MaNGOS Server Stack on Linux Using Wine

This guide explains how to run the Windows-based MaNGOS server package on a Linux machine.

The server package contains:

- MySQL 5.6.28 (Windows build)
- `realmd.exe`
- `mangosd.exe`
- Configuration files
- Server tools

The setup uses **Wine** because the binaries are compiled for Windows.

---

# 1. Install Required Packages

Install Wine and basic tools:

sudo dpkg --add-architecture i386
sudo apt update

sudo apt install wine64 wine32 pkg-config file

Verify:

wine --version
2. Prepare the Server Folder

Example location:

/home/user/Projects/rusty/server

Expected structure:

server/
├── mysql/
│   ├── bin/
│   │   ├── mysqld.exe
│   │   └── my.ini
│   ├── data/
│   └── ...
│
├── core/
│   ├── mangosd.exe
│   ├── realmd.exe
│   ├── mangosd.conf
│   └── realmd.conf
│
├── tools/
│
└── Run me first - MySQL.bat

The original Windows batch file:

cd .\mysql\bin

mysqld.exe --defaults-file=my.ini --standalone --console

must be converted to Linux commands.

3. Create a 64-bit Wine Environment

The server binaries are 64-bit.

Check:

file mysql/bin/mysqld.exe

Expected:

PE32+ executable (console) x86-64

Create a Wine prefix:

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

winecfg

Close Wine configuration after it finishes.

4. Start MySQL Server

Open terminal 1:

cd /home/user/Projects/rusty/server/mysql/bin

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

wine mysqld.exe --defaults-file=my.ini --standalone --console

Successful startup looks like:

mysqld.exe: ready for connections.

Version: '5.6.28'
port: 3306

Leave this terminal running.

Do not close it.

5. Start Realm Server

Open terminal 2:

cd /home/user/Projects/rusty/server/core

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

wine realmd.exe

This connects the login server to MySQL.

6. Start World Server

Open terminal 3:

cd /home/user/Projects/rusty/server/core

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

wine mangosd.exe

This starts the game world server.

7. Start Client

After:

MySQL
  |
  v
realmd.exe
  |
  v
mangosd.exe

is running, start the Linux client:

cargo run --release -p benilla
8. Run MySQL in Background

Instead of keeping a terminal occupied:

wine mysqld.exe --defaults-file=my.ini --standalone --console &

Check:

ps aux | grep mysqld
9. Create Linux Startup Scripts
run_mysql.sh

Create:

server/run_mysql.sh

Content:

#!/bin/bash

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

cd "$(dirname "$0")/mysql/bin"

wine mysqld.exe --defaults-file=my.ini --standalone --console
run_realmd.sh

Create:

server/run_realmd.sh

Content:

#!/bin/bash

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

cd "$(dirname "$0")/core"

wine realmd.exe
run_mangosd.sh

Create:

server/run_mangosd.sh

Content:

#!/bin/bash

export WINEARCH=win64
export WINEPREFIX=/home/user/Projects/rusty/.wine

cd "$(dirname "$0")/core"

wine mangosd.exe

Make them executable:

chmod +x run_*.sh

Start the server:

Terminal 1:

./run_mysql.sh

Terminal 2:

./run_realmd.sh

Terminal 3:

./run_mangosd.sh
10. Troubleshooting
Error: wine32 is missing

Example:

it looks like wine32 is missing

Fix:

sudo dpkg --add-architecture i386
sudo apt update
sudo apt install wine32:i386
Error: linker cc not found

Install compiler tools:

sudo apt install build-essential
Error: ALSA missing

Example:

Package 'alsa' was not found

Install:

sudo apt install libasound2-dev
Error: libudev missing

Install:

sudo apt install libudev-dev
Error: Bad EXE format

Example:

ShellExecuteEx failed: Bad EXE format

Cause:

Wrong Wine architecture.

Fix:

Use:

export WINEARCH=win64

Do not use:

export WINEARCH=win32

The server binaries are 64-bit.

Final Startup Order

Always start in this order:

1. MySQL
   |
   v
2. realmd.exe
   |
   v
3. mangosd.exe
   |
   v
4. Game Client

If MySQL says:

ready for connections

the database layer is working correctly.
