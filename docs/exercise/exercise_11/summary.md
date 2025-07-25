# Summary: Infrastructure Setup with Terraform on Hetzner Cloud

This documentation provides a structured and secure approach to provisioning virtual machines on the 
Hetzner Cloud using Terraform.
It covers both a minimal and a hardened setup, demonstrating how to manage infrastructure 
using Infrastructure as Code (IaC) principles.

## Overview

The project introduces two Terraform configurations:

1. **Basic Setup** — A minimal Terraform script that provisions a Debian server with an open SSH port (22) and a Hetzner-managed root password (delivered via email).
2. **Secure Setup** — An extended configuration using SSH keys and securely managed API tokens via `.tfvars` files. This setup eliminates the need for manual access credentials and enhances security.

## Key Features

- Automated server provisioning with the Hetzner Cloud provider
- Basic firewall configuration to allow SSH access
- SSH key-based authentication (recommended for production)
- Token and secret management using a `.auto.tfvars` template
- Output of useful connection data (IP address and datacenter)
- Ready for Git versioning, with security-conscious `.gitignore` use

## Automation Benefits

By embedding configuration and setup logic directly in Terraform:

- Servers are provisioned consistently
- Manual steps (e.g., SSH login and software installation) are minimized
- Infrastructure becomes repeatable, traceable, and auditable

This approach aligns with modern DevOps practices and is well-suited for both learning environments and professional use.


## Further Resources & References

- [Hetzner Cloud Documentation](https://docs.hetzner.com/cloud/)
- [Terraform Documentation](https://developer.hashicorp.com/terraform)
- [Hetzner Cloud Provider for Terraform](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs)