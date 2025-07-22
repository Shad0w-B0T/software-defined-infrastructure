variable "loginUserName" {
  type        = string
  description = "The name of the SSH login user"
}

variable "serverNameOrIp" {
  type        = string
  description = "IPv4 address or hostname of the server"
}

variable "serverHostPublicKey" {
  type        = string
  description = "Public SSH host key of the target server"
}
