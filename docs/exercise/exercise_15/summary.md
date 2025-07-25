# Summary

This exercise guided you through a complete lifecycle of working with an attached volume in the Hetzner Cloud — from Terraform-based provisioning to low-level Linux storage configuration using manual partitioning and mounting. The focus was not only on getting the volume operational but also on understanding how Linux manages storage devices and how to persist those mounts across reboots.

By completing the task, you achieved the following:

- Attached a block device (`/dev/sdb`) via Terraform and handled Hetzner’s automount bug with a `udevadm trigger` workaround.
- Used `fdisk` to manually split the volume into two primary partitions: `/dev/sdb1` and `/dev/sdb2`.
- Formatted each partition using different file systems: `ext4` and `xfs`.
- Mounted one partition by device path and the other via UUID, reinforcing stable mounting practices.
- Updated `/etc/fstab` to ensure persistent mounts and verified configuration with `mount -a` and `df -h` after reboot.

This hands-on walkthrough emphasized manual interaction with system tools to help demystify storage device management and make these operations feel familiar and intuitive.

## Further Resources & References

- [`fdisk(8)` man page](https://man7.org/linux/man-pages/man8/fdisk.8.html) — for managing partition tables interactively
- [`mkfs` family](https://man7.org/linux/man-pages/man8/mkfs.8.html) — to format partitions with various file systems
- [`mount(8)` man page](https://man7.org/linux/man-pages/man8/mount.8.html) — core utility for mounting filesystems
- [`/etc/fstab` documentation](https://wiki.archlinux.org/title/fstab) — Arch Wiki’s well-maintained explanation of fstab structure and usage
- [`blkid(8)`](https://man7.org/linux/man-pages/man8/blkid.8.html) — display or modify block device attributes
- [`udevadm trigger`](https://man7.org/linux/man-pages/man8/udevadm.8.html) — command to reapply udev rules, helpful in cloud environments with hotplug volumes
- [Hetzner Terraform provider docs](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs) — official documentation on how to manage resources using Terraform
