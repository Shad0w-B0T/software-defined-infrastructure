# ️ Incrementally Creating a Base System with Terraform

This document describes how to set up a simple infrastructure in the Hetzner Cloud with Terraform - secure, traceable and versionable.

Goal:
- Create a server in Hetzner Cloud with SSH access and firewall
- Manage Hetzner API tokens securely
- Use SSH key login instead of password login
- Display Terraform output for IP address and data center
- Enable project versioning via Git

## Minimal Configuration & SSH Firewall Rule

We start with the basic configuration, supplemented by a firewall rule for port 22 (SSH):

**File: `main.tf`**
```hcl
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = ">= 1.46.1"
    }
  }
  required_version = ">= 0.13"
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_firewall" "sshFw" {
  name = "ssh-firewall"
  rule {
    direction   = "in"
    protocol    = "tcp"
    port        = "22"
    source_ips  = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "helloServer" {
  name         = "hello"
  image        = "debian-12"
  server_type  = "cx22"
  firewall_ids = [hcloud_firewall.sshFw.id]
}
```

## Create a server and receive e-mail with access data

Now execute Terraform:

```shell
terraform init
terraform apply
```

**Why do I receive an e-mail with IP and root password?**

If **no SSH key** is specified, Hetzner automatically creates a root password on the first boot. This is sent by **e-mail**. 
The e-mail contains:

- IPv4 & IPv6 address
- Root username
- Initial password

This is a **fallback mechanism from Hetzner** if no key is available.
For security reasons, you should then only work with SSH keys.

## Versioning the Project & Securing API Tokens

A common security risk is placing sensitive credentials—such as API tokens—directly in the code (e.g., inside `main.tf`). 
To avoid this, you should externalize such secrets using `.tfvars` files or environment variables.

### Secure Token Handling via `.tfvars` File

Terraform automatically loads any file ending in `.auto.tfvars.` For a secure workflow, follow these steps:

1. A **template file** (`secrets.auto.tfvars.template`) is included in the repository—**without any real credentials**.
2. Users must copy the file, rename it, and insert their own API token:

```shell
cp secrets.auto.tfvars.template secrets.auto.tfvars
nano secrets.auto.tfvars # Edit content here
```

Example content:
```hcl
hcloud_token = "your_api_token_goes_here"
```

## Security Warning

The `secrets.auto.tfvars` file must never be checked into version control!

Make sure it is explicitly listed in `.gitignore`:

```file
# .gitignore
secrets.auto.tfvars
```

:::warning Important 
Before committing your code, double-check with git status to confirm that the secrets file is ignored.
:::
