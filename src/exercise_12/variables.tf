variable "hcloud_token" {
  description = "Hetzner Cloud API Token for authenticating requests"
  type        = string
  nullable    = false
  sensitive   = true
}

variable "public_key" {
  description = "Public SSH key used for server access"
  type        = string
  nullable    = false
}
