output "ip_addr" {
  value       = hcloud_server.server01.ipv4_address
  description = "The server's IPv4 address"
}

output "datacenter" {
  value       = hcloud_server.server01.datacenter
  description = "The server's datacenter"
}

output "volume_device" {
  value       = hcloud_volume.volume01.linux_device
  description = "Device path of the attached volume (z.B. /dev/sdb)"
}
