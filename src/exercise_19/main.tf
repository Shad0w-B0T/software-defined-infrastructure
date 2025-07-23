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

# A record for the root domain (e.g., g3.sdi.hdm-stuttgart.cloud → 1.2.3.4)
# resource "dns_a_record_set" "root_domain" {
#  zone      = "${var.dnsZone}."
#  name      = "@"
#  addresses = [var.serverIp]
#  ttl       = 10
# }

# A record for the canonical server (e.g., workhorse.g3.sdi.hdm-stuttgart.cloud → 1.2.3.4)
resource "dns_a_record_set" "canonical" {
  zone      = "${var.dnsZone}."
  name      = var.serverName
  addresses = [var.serverIp]
  ttl       = 10
}

# CNAME aliases (e.g., www/mail.g3.sdi.hdm-stuttgart.cloud → workhorse.g3.sdi.hdm-stuttgart.cloud)
resource "dns_cname_record" "aliases" {
  count = length(var.serverAliases)

  zone  = "${var.dnsZone}."
  name  = var.serverAliases[count.index]
  cname = "${var.serverName}.${var.dnsZone}."
  ttl   = 10
}
