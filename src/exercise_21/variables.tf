variable "dnsZone" {
  description = "The base DNS zone where records will be created (e.g., gxy.sdi.hdm-stuttgart.cloud)."
  type        = string
}

variable "serverBaseName" {
  description = "The base name or prefix used for naming multiple servers (e.g., 'work' results in 'work-01', 'work-02', etc.)."
  type        = string
}

variable "serverCount" {
  description = "The number of servers to create dynamically."
  type        = number

  validation {
    condition     = var.serverCount >= 1 && var.serverCount <= 255
    error_message = "The number of servers must be between 1 and 255."
  }
}

variable "dns_key_name" {
  description = "The TSIG key name used for DNS challenge authentication (e.g., g3.key)."
  type        = string
}

variable "dns_secret" {
  description = "The TSIG shared secret used to securely authenticate DNS updates. Keep this secret safe."
  type        = string
  sensitive   = true
}