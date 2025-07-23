provider "acme" {
  # server_url = "https://acme-staging-v02.api.letsencrypt.org/directory" # staging
  server_url = "https://acme-v02.api.letsencrypt.org/directory" # production
}

resource "tls_private_key" "cert_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "acme_registration" "reg" {
  account_key_pem = tls_private_key.cert_key.private_key_pem
  email_address   = var.contact_mail
}

resource "acme_certificate" "cert" {
  depends_on = [acme_registration.reg]

  account_key_pem = tls_private_key.cert_key.private_key_pem
  common_name     = "*.${var.dns_zone}"

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

resource "local_file" "cert_pem" {
  content  = acme_certificate.cert.certificate_pem
  filename = "${path.module}/gen/certificate.pem"
}

resource "local_file" "private_pem" {
  content  = acme_certificate.cert.private_key_pem
  filename = "${path.module}/gen/private.pem"
}
