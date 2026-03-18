---
title: "Dev Enviroments Setups"
date: "2026-03-18"
slug: "dev-environment"
---

## NodeJS

`sudo apt update`

`sudo apt install -y curl build-essential`

`curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`

`export NVM_DIR="$HOME/.nvm"`

`source "$NVM_DIR/nvm.sh"`

`nvm install --lts`

`nvm use --lts`

`node -v`

`npm -v`

## Rust

`sudo apt update`

`sudo apt install -y build-essential pkg-config libssl-dev`

`curl https://sh.rustup.rs -sSf | sh -s -- -y`

`source $HOME/.cargo/env`

`rustc --version`

`cargo --version`
