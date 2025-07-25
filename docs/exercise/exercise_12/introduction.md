# Automatic Nginx Installation via Terraform & Cloud-init

This guide shows how to automatically install and configure the Nginx web server on a Hetzner Cloud VM using Terraform. 
The setup is done via a shell script in the user_data block, which installs Nginx, starts it, and enables it to run on boot.

By embedding this logic into Terraform, servers are provisioned consistently and ready to serve web content without
manual configuration — ideal for automated, reproducible IaC workflows.

Goal: 
- Automatically install the Nginx web server during VM provisioning 
- Start and enable Nginx using systemctl 
- Embed the setup logic via Terraform user_data 
- Avoid manual SSH configuration steps 
- Keep infrastructure declarative and reproducible

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install)
- SSH keypair
- [Hetzner](https://www.hetzner.com/) API Token from Hetzner Console
- A working Hetzner Cloud project with server quota 
- Basic understanding of:
  - Terraform configuration syntax
  - Linux shell scripting 
  - [Nginx](https://nginx.org/) and [systemd](https://wiki.archlinux.org/title/Systemd) service management 
  - [Cloud-init](https://cloudinit.readthedocs.io/en/latest/) mechanism
