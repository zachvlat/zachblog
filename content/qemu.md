---
title: "QEMU"
date: "2025-06-19"
slug: "qemu"
---

## Add QEMU to PATH (PowerShell)

```powershell
$env:Path += ";C:\Program Files\qemu"
```

## Create VM Image

```bash
qemu-img create -f qcow2 zatsvm.img 40G
```

## KVM acceleration

```bash
qemu-system-x86_64 -enable-kvm -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\iso.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -enable-kvm -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user
```

## TCG emulation

```bash
qemu-system-x86_64 -accel tcg -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\iso.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -accel tcg -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user
```

## HAX acceleration

```bash
qemu-system-x86_64 -accel hax -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\iso.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -accel hax -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user
```

## WHPX acceleration

```bash
qemu-img create -f qcow2 popos.img 40G
qemu-system-x86_64 -accel whpx -m 4G -boot d -cdrom "C:\Users\zaxos\popos.iso" -hda "C:\Users\zaxos\popos.img" -smp cores=2 -net nic -net user
qemu-system-x86_64 -accel whpx -m 4G -hda "C:\Users\zaxos\popos.img" -smp cores=2 -net nic -net user
```
