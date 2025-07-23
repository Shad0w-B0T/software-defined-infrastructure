variable "entries" {
  description = "List of SSH known hosts entries"
  type = list(object({
    serverName          = string
    serverNameOrIp      = string
    serverHostPublicKey = string
    loginUserName       = string
  }))
}
