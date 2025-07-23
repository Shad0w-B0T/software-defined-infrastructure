# DNS & SSH Known Hosts Automation with Terraform

This project uses Terraform to:

- Create DNS `A` and `CNAME` records
- Automatically generate `known_hosts` files
- Provide custom `ssh-<hostname>` and `scp-<hostname>` helper scripts


## DNS Configuration

The DNS configuration uses the [HashiCorp DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest) to manage A and CNAME records.

### Example Setup

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

# A record for canonical server name (e.g., workhorse.g3.sdi.hdm-stuttgart.cloud → 1.2.3.4)
resource "dns_a_record_set" "canonical" {
  zone      = "${var.dnsZone}."
  name      = var.serverName
  addresses = [var.serverIp]
  ttl       = 10
}

# CNAME records (e.g., www/mail.g3.sdi.hdm-stuttgart.cloud → workhorse.g3.sdi.hdm-stuttgart.cloud)
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

- A `known_hosts` file for the server
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