# Creating a Hetzner Server with Terraform (Basic Setup)

## Project Structure

```shell
project-root/
└── main.tf   # Terraform configuration with firewall and server
```

## Minimal Configuration with Firewall Rule (No SSH)

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
  token = "<token>"
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

## What This Does

1. Initializes the Hetzner Cloud provider.
2. Authenticates using a token (inserted directly here, not secure).
3. Creates a firewall named `ssh-firewall` allowing port 22 (SSH) from anywhere.
4. Provisions a Debian 12 server with the firewall attached.

::: warning ⚠️ WARNING:
**No SSH key is defined in this setup.**

If no SSH key is used:
- Hetzner sends a **root password** via email after server creation.
- This is a fallback mechanism.
- You should use SSH keys instead for production environments.
:::

## How to Improve This Setup

To make this secure:
- Use a `.tfvars` file for the token
- Add an `hcloud_ssh_key` resource
- Attach the SSH key to the server using the `ssh_keys` argument

See: [Secure Hetzner Setup](./secure_server.md)

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