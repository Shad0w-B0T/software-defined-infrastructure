# ️ Incrementally Creating a Base System with Terraform

This document describes how to set up a simple infrastructure in the Hetzner Cloud with Terraform - secure, traceable and versionable.

Goal:
- Create a server in Hetzner Cloud with SSH access and firewall
- Manage Hetzner API tokens securely
- Use SSH key login instead of password login
- Display Terraform output for IP address and data center
- Enable project versioning via Git (`.gitignore`)

## Prerequisites

- [Firewall understanding](../exercise_1/step-by-step/firewall.md)
- [Knowledge of how to create a server](../exercise_1/step-by-step/create-server.md)
- Make sure the following tools and configurations are available:
  - [Terraform](https://developer.hashicorp.com/terraform/install) → `terraform -v`
  - SSH keypair
  - Hetzner API Token from Hetzner Console
