# Introduction to Partitions and Mounting

This exercise walks you through the foundational steps of working with block storage in a Linux 
environment — specifically, how to add, partition, and mount a Hetzner Cloud volume using a mix of Terraform 
provisioning and manual system administration.

Rather than relying on full automation, this guide is designed to help you understand how Linux handles devices, 
partitions, and file systems at a low level. You'll create a Hetzner volume via Terraform, handle a known automount 
bug with a manual workaround, then log into the provisioned server to interactively explore, partition, 
and mount the volume.

## What You'll Learn

- How Hetzner volumes are attached to Linux systems using Terraform
- How to inspect mounted file systems and devices (`df`, `lsblk`, `blkid`)
- How to create and manage partitions using `fdisk`
- How to format partitions with different file systems (`ext4`, `xfs`)
- How to mount partitions manually and via `/etc/fstab` for persistence
- How UUIDs can be used in place of device paths for more stable mounts

## Why This Matters

Storage management is a key skill in system administration, especially in the cloud. 
Real-world production systems often use attached block storage for persistence, scaling, or separating workloads. 
Understanding how to inspect, partition, format, and mount volumes gives you critical control and visibility over 
how your systems use storage.

## Prerequisites

- A working Hetzner Cloud environment set up via Terraform
- SSH access to your provisioned server
- Basic familiarity with Linux shell commands
- Tools available on the system: `fdisk`, `mkfs`, `mount`, `blkid`, `lsblk`, `df`, `udevadm`
- Sudo or root privileges on the remote server

::: tip 💡 Tip: 
You’ll perform several steps manually after Terraform provisioning. 
This helps you better understand how Linux manages disks beyond infrastructure automation. 
:::
