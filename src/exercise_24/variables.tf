variable "hcloud_token" {
  description = "Hetzner API Token"
  type        = string
  nullable    = false
  sensitive   = true
}

variable "dns_key_name" {}
variable "dns_secret" {}
variable "contact_mail" {
  default = "admin@example.com"
}
variable "dns_zone" {
  default = "g3.sdi.hdm-stuttgart.cloud"
}
variable "server_name" {
  default = "g3"
}
variable "server_aliases" {
  default = ["www", "mail"]
}
