variable "hcloud_token" {
  description = "Hetzner API Token used to authenticate Terraform with the Hetzner Cloud API."
  type        = string
  nullable    = false
  sensitive   = true
}

variable "dns_key_name" {
  description = "TSIG key name used for RFC2136 DNS challenge authentication (e.g., g3.key)."
  type        = string
}

variable "dns_secret" {
  description = "TSIG shared secret used for secure DNS updates. Keep this secret safe."
  type        = string
  sensitive   = true
}

variable "contact_mail" {
  description = "Email address used for ACME account registration (e.g., Let's Encrypt)."
  type        = string
  default     = "admin@example.com"
}

variable "dns_zone" {
  description = "DNS zone managed for certificate issuance and DNS records (e.g., g3.sdi.hdm-stuttgart.cloud)."
  type        = string
  default     = "g3.sdi.hdm-stuttgart.cloud"
}

variable "server_name" {
  description = "Hostname for the main server within the given DNS zone (e.g., g3)."
  type        = string
  default     = "g3"
}

variable "server_aliases" {
  description = "List of subdomain aliases used in DNS and wildcard certificate generation (e.g., www, mail)."
  type        = list(string)
  default     = ["www", "mail"]
}

variable "public_key" {
  description = "SSH public key (in OpenSSH format) used to provision access to the server."
  type        = string
}
