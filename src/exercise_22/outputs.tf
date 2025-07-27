resource "local_file" "private_key_pem" {
  content  = acme_certificate.wildcard_cert.private_key_pem
  filename = "${path.module}/gen/private.pem"
}

resource "local_file" "certificate_pem" {
  content  = acme_certificate.wildcard_cert.certificate_pem
  filename = "${path.module}/gen/certificate.pem"
}