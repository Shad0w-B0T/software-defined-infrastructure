output "ip_addr" {
  value       = hcloud_server.server.ipv4_address
  description = "The server's IPv4 address"
}

output "datacenter" {
  value       = hcloud_server.server.datacenter
  description = "The server's datacenter"
}

output "ssh_command" {
  value = "bin/ssh"
  description = "SSH Wrapper command"
}

output "scp_command" {
  value = "bin/scp <local-file> ${hcloud_ssh_key.loginUser.name}@${hcloud_server.server.ipv4_address}:<target-path>"
}
