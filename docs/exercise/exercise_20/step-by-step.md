# DNS & SSH Known Hosts Automation with Terraform

## Project Overview

- DNS configuration (A and CNAME records) using the [HashiCorp DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest)
- Generation of a trusted `known_hosts` file based on the server's SSH public key
- Creation of SSH and SCP wrapper scripts that securely reference the server via its DNS name

## Project Structure

```bash
project-root/
├── bin/
│   ├── ssh                # SSH wrapper script
│   └── scp                # SCP wrapper script
├── gen/
│   └── known_hosts        # Custom known_hosts file
├── terraform/             # Terraform files
│   ├── main.tf
│   ├── variables.tf
│   ├── secrets.auto.tfvars.template
│   └── secrets.auto.tfvars
```

## DNS Configuration

The DNS setup creates:

- An **A record** pointing a hostname (e.g. `workhorse.g3.sdi.hdm-stuttgart.cloud`) to an IP
- Multiple **CNAME aliases** (e.g. `www`, `mail`) pointing to the canonical hostname

### Example Terraform Configuration

```hcl
terraform {
  required_providers {
    dns = {
      source = "hashicorp/dns"
    }
  }
}

provider "dns" {
  update {
    server        = "ns1.sdi.hdm-stuttgart.cloud"
    key_name      = var.dns_key_name
    key_algorithm = "hmac-sha512"
    key_secret    = var.dns_secret
  }
}

resource "dns_a_record_set" "canonical" {
  zone      = "${var.dnsZone}."
  name      = var.serverName
  addresses = [var.serverIp]
  ttl       = 10
}

resource "dns_cname_record" "aliases" {
  count = length(var.serverAliases)

  zone  = "${var.dnsZone}."
  name  = var.serverAliases[count.index]
  cname = "${var.serverName}.${var.dnsZone}."
  ttl   = 10
}
```

### Required Variables

```hcl
variable "dnsZone" {
  type        = string
  description = "DNS zone (e.g. g3.sdi.hdm-stuttgart.cloud)"
}

variable "serverIp" {
  type        = string
  description = "IPv4 address of the server"
}

variable "serverName" {
  type        = string
  description = "Short hostname (e.g. workhorse)"
}

variable "serverAliases" {
  type        = list(string)
  description = "CNAME aliases (e.g. [\"www\", \"mail\"])"
}

variable "dns_key_name" {
  type        = string
  description = "TSIG key name (e.g. g3.key.)"
}

variable "dns_secret" {
  type        = string
  description = "TSIG key secret (base64-encoded)"
}
```

## SSH Known Hosts Module

This module generates:

- A ``known_hosts`` file containing the server’s SSH public key under its DNS name
- SSH and SCP script that use those known host

```hcl
module "createSshKnownHosts" {
  source = "../modules/ssh_known_hosts"

  entries = [
    {
      serverName          = hcloud_server.server.name                        # e.g., "workhorse"
      loginUserName       = hcloud_ssh_key.loginUser.name                    # e.g., "devops"
      serverNameOrIp      = "${var.serverName}.${var.dnsZone}" # e.g. workhorse.g3.sdi.hdm-stuttgart.cloud
      serverHostPublicKey = tls_private_key.host.public_key_openssh         # e.g., "ssh-ed25519 AAAAC3Nza..."
    }
  ]
}
```

## Testing and Verification

After running ``terraform apply``, verify the DNS entries and SSH setup:

### Verify DNS

```bash
dig +short @ns1.hdm-stuttgart.cloud workhorse.g3.sdi.hdm-stuttgart.cloud
dig +short @ns1.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud
```

### Check SSH Wrapper

```bash
./bin/ssh
./bin/scp ./local.txt devops@workhorse.g3.sdi.hdm-stuttgart.cloud:/tmp/
```
