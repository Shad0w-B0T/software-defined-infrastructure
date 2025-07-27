variable "login_user" {
  description = "Username used for login"
  type        = string
}

variable "ssh_public_key" {
  description = "SSH public key for user"
  type        = string
}

variable "host_private_key" {
  description = "Private key of the host (OpenSSH format)"
  type        = string
  sensitive   = true
}

variable "host_public_key" {
  description = "Public key of the host"
  type        = string
}
