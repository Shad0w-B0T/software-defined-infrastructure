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

resource "tls_private_key" "host" {
  algorithm = "ED25519"
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

module "createSshKnownHosts" {
  source = "../modules/ssh_known_hosts"

  entries = [
    {
      serverName          = "hetzner-platzhalter"
      loginUserName       = "devops-dummy"
      serverNameOrIp      = "${var.serverName}.${var.dnsZone}" # e.g. workhorse.g3.sdi.hdm-stuttgart.cloud
      serverHostPublicKey = tls_private_key.host.public_key_openssh
    }
  ]
}
