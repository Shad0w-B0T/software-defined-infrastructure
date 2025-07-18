output "ip_addr" {
  value       = hcloud_server.nginxServer.ipv4_address
  description = "The server's IPv4 address"
}

output "datacenter" {
  value       = hcloud_server.nginxServer.datacenter
  description = "The server's datacenter"
}

output "ssh_command" {
  value = "bin/ssh"
  description = "SSH Wrapper command"
}

output "scp_command" {
  value = "bin/scp <local-file> devops@${hcloud_server.nginxServer.ipv4_address}:<target-path>"
}
