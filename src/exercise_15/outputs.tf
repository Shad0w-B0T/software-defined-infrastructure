output "ip_addr" {
  value       = hcloud_server.nginxServer.ipv4_address
  description = "The server's IPv4 address"
}

output "datacenter" {
  value       = hcloud_server.nginxServer.datacenter
  description = "The server's datacenter"
}

output "volume_device" {
  value       = hcloud_volume.volume01.linux_device
  description = "Device path of the attached volume (z.B. /dev/sdb)"
}
