terraform {
  required_providers {
    acme = {
      source = "vancluever/acme"
    }
  }
  required_version = ">= 0.13"
}

provider "acme" {
  server_url = "https://acme-staging-v02.api.letsencrypt.org/directory"
}

# Generiere privaten Schlüssel für das Zertifikat
resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# Registrierung beim ACME-Server mit Email (kann dummy sein)
resource "acme_registration" "reg" {
  account_key_pem = tls_private_key.private_key.private_key_pem
  email_address   = var.contact_mail
}

resource "acme_certificate" "wildcard_cert" {
  depends_on = [acme_registration.reg]

  account_key_pem = tls_private_key.private_key.private_key_pem

  common_name = "*.g3.sdi.hdm-stuttgart.cloud"

#  Best practice, but is blocked by the ns
#  common_name = "g3.sdi.hdm-stuttgart.cloud"
#  subject_alternative_names = [
#    "*.g3.sdi.hdm-stuttgart.cloud"
#  ]

  dns_challenge {
    provider = "rfc2136"

    config = {
      RFC2136_NAMESERVER     = "ns1.sdi.hdm-stuttgart.cloud"
      RFC2136_TSIG_ALGORITHM = "hmac-sha512"
      RFC2136_TSIG_KEY       = var.dns_key_name
      RFC2136_TSIG_SECRET    = var.dns_secret
    }
  }
}