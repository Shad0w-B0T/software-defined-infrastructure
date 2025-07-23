provider "dns" {
  update {
    server        = "ns1.sdi.hdm-stuttgart.cloud"
    key_name      = var.dns_key_name
    key_algorithm = "hmac-sha512"
    key_secret    = var.dns_secret
  }
}

resource "dns_a_record_set" "root" {
  zone      = "${var.dns_zone}."
  name      = var.server_name
  addresses = [hcloud_server.server.ipv4_address]
  ttl       = 60
}

resource "dns_cname_record" "aliases" {
  count = length(var.server_aliases)
  zone  = "${var.dns_zone}."
  name  = var.server_aliases[count.index]
  cname = "${var.server_name}.${var.dns_zone}."
  ttl   = 60
}
