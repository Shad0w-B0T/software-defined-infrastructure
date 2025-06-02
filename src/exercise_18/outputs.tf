output "ip_addr" {
  value       = hcloud_server.caddyServer.ipv4_address
  description = "Server's public IP address"
}

output "datacenter" {
  value = hcloud_server.caddyServer.datacenter
}
