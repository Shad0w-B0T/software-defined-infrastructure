variable "hcloud_token" {
  description = "The Hetzner Cloud API token used to authenticate and manage infrastructure on Hetzner Cloud."
  type        = string
  nullable    = false
  sensitive   = true
}

variable "dns_key_name" {
  description = "The name of the TSIG key used for DNS challenge authentication with the RFC2136 DNS provider."
  type        = string
}

variable "dns_secret" {
  description = "The TSIG shared secret associated with the DNS key. Used for secure updates to the DNS zone."
  type        = string
  sensitive   = true
}

variable "contact_mail" {
  description = "Contact email address used during ACME certificate registration. Can be a dummy in staging."
  type        = string
  default     = "admin@example.com"
}

variable "dns_zone" {
  description = "The DNS zone for which certificates and DNS records will be managed. Usually your group subdomain."
  type        = string
  default     = "g3.sdi.hdm-stuttgart.cloud"
}

variable "server_name" {
  description = "The name of the main server. This is used in DNS records and host references."
  type        = string
  default     = "g3"
}

variable "server_aliases" {
  description = "List of subdomain aliases (e.g., www, mail) used for creating wildcard certificates and DNS entries."
  type        = list(string)
  default     = ["www", "mail"]
}

variable "public_key" {
  description = "The SSH public key used to authorize login to the deployed server. Should be in OpenSSH format."
  type        = string
}
