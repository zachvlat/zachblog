---
title: "QEMU"
date: "2025-06-19"
slug: "qemu"
---

```bash
qemu-img create -f qcow2 zatsvm.img 40G

# KVM acceleration
qemu-system-x86_64 -enable-kvm -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\debian.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -enable-kvm -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user

# TCG emulation
qemu-system-x86_64 -accel tcg -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\debian.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -accel tcg -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user

# HAX acceleration
qemu-system-x86_64 -accel hax -m 4G -boot d -cdrom "C:\Users\Zaxos\Downloads\debian.iso" -hda zatsvm.img -smp cores=2 -net nic -net user
qemu-system-x86_64 -accel hax -m 4G -hda "C:\Users\Zaxos\zatsvm.img" -smp cores=2 -net nic -net user

# WHPX acceleration
qemu-system-x86_64 -accel whpx -m 4G -boot d -cdrom "C:\Users\zaxos\popos\popos.iso" -hda "C:\Users\zaxos\popos\popos.img" -smp cores=2 -net nic -net user
