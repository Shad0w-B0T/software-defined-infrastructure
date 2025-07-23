variable "dnsZone" {
  description = "Base DNS zone (e.g., gxy.sdi.hdm-stuttgart.cloud)"
  type        = string
}

variable "serverBaseName" {
  description = "Prefix for server names (e.g., work)"
  type        = string
}

variable "serverCount" {
  description = "Number of servers to create"
  type        = number

  validation {
    condition     = var.serverCount >= 1 && var.serverCount <= 255
    error_message = "The number of servers must be between 1 and 255."
  }
}

variable "dns_key_name" {
  description = "TSIG key name (e.g., g3.key)"
  type        = string
}

variable "dns_secret" {
  description = "TSIG shared secret"
  type        = string
  sensitive   = true
}
