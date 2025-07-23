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

# Local list of server names like ["work-1", "work-2"]
locals {
  server_names = [
    for i in range(1, var.serverCount + 1) :
    "${var.serverBaseName}-${i}"
  ]
}

# Generate SSH host key for each server
resource "tls_private_key" "host" {
  for_each = toset(local.server_names)
  algorithm = "ED25519"
}

# Fake server IPs – replace with actual provisioned IPs if needed
locals {
  server_ips = {
    for i in range(1, var.serverCount + 1) :
    "${var.serverBaseName}-${i}" => "10.0.0.${i + 10}"
  }
}

# DNS A records for each server
resource "dns_a_record_set" "canonical" {
  for_each = local.server_ips

  zone      = "${var.dnsZone}."
  name      = each.key
  addresses = [each.value]
  ttl       = 10
}

# Feed entries to ssh_known_hosts module
module "createSshKnownHosts" {
  source = "../modules/ssh_known_hosts"

  entries = [
    for server_name in local.server_names : {
      serverName          = server_name
      loginUserName       = "devops"
      serverNameOrIp      = "${server_name}.${var.dnsZone}"
      serverHostPublicKey = tls_private_key.host[server_name].public_key_openssh
    }
  ]
}
