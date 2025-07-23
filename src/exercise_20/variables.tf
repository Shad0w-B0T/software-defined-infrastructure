variable "dnsZone" {
  description = "Base DNS zone (e.g. gxy.sdi.hdm-stuttgart.cloud)"
  type        = string
}


variable "serverIp" {
  description = "IP address of the target server"
  type        = string
}

variable "serverName" {
  description = "Canonical name of the server"
  type        = string

  validation {
    condition     = length(trimspace(var.serverName)) > 0
    error_message = "Server name must not be empty."
  }
}

variable "serverAliases" {
  description = "List of alias names for the server (e.g., www, mail)"
  type        = list(string)

  validation {
    condition     = length(distinct(var.serverAliases)) == length(var.serverAliases)
    error_message = "Duplicate alias names are not allowed."
  }

  validation {
    condition     = !contains(var.serverAliases, var.serverName)
    error_message = "Server alias list must not contain the server name itself."
  }
}

variable "dns_key_name" {
  description = "The TSIG key name (e.g., g12.key)"
  type        = string
}

variable "dns_secret" {
  description = "The TSIG shared secret"
  type        = string
  sensitive   = true
}
