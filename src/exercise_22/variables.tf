variable "dns_key_name" {
  description = "The name of the TSIG key used for RFC2136 DNS challenge authentication (e.g., g3.key)."
  type        = string
}

variable "dns_secret" {
  description = "The shared secret for the TSIG key used to authenticate DNS updates securely. Keep this value secret."
  type        = string
  sensitive   = true
}

variable "contact_mail" {
  description = "The contact email address used for ACME certificate registration (e.g., Let's Encrypt)."
  type        = string
  sensitive   = true
}