---
title: "Taiscale WSL"
date: "2026-07-03"
slug: "taiscale-wsl"
---

# Installing Tailscale on Alpine Linux (WSL or Docker)

This guide covers installing and running Tailscale on a minimal Alpine Linux environment, such as WSL or a Docker container without `systemd` or OpenRC.

## 1. Install Tailscale

```sh
apk update
apk add tailscale
```

Verify the installation:

```sh
tailscale version
tailscaled --version
```

---

## 2. Create the required directories

```sh
mkdir -p /var/lib/tailscale
mkdir -p /var/run/tailscale
```

---

## 3. Start the Tailscale daemon

Since minimal Alpine environments often do not run an init system, start `tailscaled` manually:

```sh
tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock &
```

The daemon should remain running in this terminal.


---

## 4. Connect to your tailnet

Open another terminal and run:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock up
```

If authentication is required:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock login
```

A login URL will be displayed. Open it in your browser and complete the authentication.

---

## 5. Verify the connection

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock status
```

View your Tailscale IPs:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock ip
```

---

# Serving a local service

Suppose your application is listening on port `8080`.

Expose it to your tailnet:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock serve 8080
```

Or expose it publicly using Tailscale Funnel (must be enabled for your tailnet):

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock funnel 8080
```

---

# Common troubleshooting

## "failed to connect to local tailscaled"

The daemon is not running.

Start it:

```sh
tailscaled \
  --state=/var/lib/tailscale/tailscaled.state \
  --socket=/var/run/tailscale/tailscaled.sock
```

---

## "dial unix ... tailscaled.sock: no such file or directory"

The CLI cannot find the daemon socket.

Ensure:

* `tailscaled` is running.
* The socket path matches the one passed to both `tailscaled` and `tailscale`.

---

## "TPM: error opening /dev/tpmrm0"

Example:

```text
TPM: error opening: stat /dev/tpmrm0: no such file or directory
```

This is expected in many WSL and Docker environments and can usually be ignored.

---

# Running automatically

Minimal Alpine environments (such as WSL or lightweight Docker containers) often do not include `systemd` or OpenRC.

In those cases, start `tailscaled` manually or from your container entrypoint/startup script.

Example:

```sh
#!/bin/sh

mkdir -p /var/lib/tailscale
mkdir -p /var/run/tailscale

exec tailscaled \
  --state=/var/lib/tailscale/tailscaled.state \
  --socket=/var/run/tailscale/tailscaled.sock
```

---

# Useful commands

Show status:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock status
```

Show IP addresses:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock ip
```

Ping another machine on your tailnet:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock ping <hostname>
```

Disconnect:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock down
```

Reconnect:

```sh
tailscale --socket=/var/run/tailscale/tailscaled.sock up
```
