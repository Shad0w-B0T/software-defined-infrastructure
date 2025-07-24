variable "hcloud_token" {
  description = "Hetzner API Token"
  type        = string
  nullable    = false
  sensitive   = true
}
variable "public_key" {}
variable "private_key" {}