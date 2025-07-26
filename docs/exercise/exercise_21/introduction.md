# Creating Multiple Hosts with Unique DNS and SSH Configuration

This guide walks you through creating a configurable number of server instances with unique DNS records and 
individual SSH access configurations using Terraform.

You will configure `serverCount`, `serverBaseName`, and a `dnsZone` in a `.tfvars` file, and Terraform will automatically:

- Provision N servers named `work-1`, `work-2`, ..., `work-N`
- Register each server with a unique A record like `work-1.gxy.sdi.hdm-stuttgart.cloud`
- Generate a unique SSH key pair for each server
- Create per-server subdirectories (`work-1/`, `work-2/`, …), each containing:
    - A `gen/known_hosts` file for SSH validation
    - A `bin/ssh` wrapper script to connect securely via the DNS name


## Prerequisites

- A subdomain delegated to your team, e.g., `gxy.sdi.hdm-stuttgart.cloud`
- Access to the authoritative DNS server `ns1.hdm-stuttgart.cloud`
- A valid TSIG HMAC key configured in your environment:

```bash
export HMAC="hmac-sha512:<key-name>:<base64-secret>"
```