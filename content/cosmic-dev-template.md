---
title: "Cosmic App Template"
date: "2026-03-21"
slug: "cosmic-dev-template"
---

This guide walks you through building and running the **Cosmic App Template** from source.

---

## Prerequisites

Make sure your system is up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Install Rust

Install Rust using `rustup`:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

---

## Install Dependencies

Install required system packages:

```bash
sudo apt install build-essential pkg-config libssl-dev just libxkbcommon-dev -y
```

---

## Install Cargo Generate

```bash
cargo install cargo-generate
```

---

## Generate the Project

```bash
cargo generate gh:pop-os/cosmic-app-template
```

---

## Run the App

```bash
just run
```

---

## Notes

* If you encounter issues, try updating Rust:

  ```bash
  rustup update
  ```
