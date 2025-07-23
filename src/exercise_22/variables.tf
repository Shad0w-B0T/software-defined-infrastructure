variable "dns_key_name" {
  description = "TSIG key name (e.g., g3.key)"
  type        = string
}

variable "dns_secret" {
  description = "TSIG shared secret"
  type        = string
  sensitive   = true
}

variable "contact_mail" {
  description = ""
  type        = string
  sensitive   = true
}