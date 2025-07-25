# Introduction to Manual Volume Mounting via Cloud-init

In this guide, you’ll learn how to manually define and configure a fixed mount point (e.g., `/volume01`) 
for a Hetzner Cloud volume attached to a server instance.
Unlike the default Hetzner behavior—where Cloud-init automatically mounts volumes to dynamically 
generated paths like `/mnt/HC_Volume_*`—we’ll take full control over the mounting process.

This is particularly useful in production environments where predictable mount points are required for 
application configurations, backup scripts, or monitoring tools.

To achieve this, you'll decouple the creation of your cloud server and volume, 
attach the volume explicitly without automounting, and then use Cloud-init to configure the desired 
mount point and filesystem settings.

## What You'll Learn

- How to independently provision a server and volume in Hetzner Cloud
- How to use `hcloud_volume_attachment` with `automount = false`
- How to pass volume metadata (Linux device path and name) into your Cloud-init configuration
- How to define a persistent and stable mount point like `/volume01`
- How to automate fstab entry creation and mounting via Cloud-init
- How to apply changes immediately with `systemctl daemon-reload` and `mount -a`

## Why This Approach Matters

Automated mount paths like `/mnt/HC_Volume_102626366` are not predictable and can make automation, 
documentation, or infrastructure reuse difficult.
By explicitly defining mount points and controlling the mounting process through Cloud-init, 
you ensure clarity, reproducibility, and maintainability in your infrastructure setup.

This pattern also mirrors best practices for production systems: 
- decoupled resource management
- explicit device control
- declarative system configuration

## Prerequisites

- Terraform CLI and a working Hetzner Cloud project setup
- A Linux-compatible Cloud-init image (e.g., Debian or Ubuntu)
- SSH access to the server
- Familiarity with Terraform HCloud resources:
    - `hcloud_server`
    - `hcloud_volume`
    - `hcloud_volume_attachment`
- Basic knowledge of Cloud-init and fstab configuration
