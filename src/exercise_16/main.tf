terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = ">= 1.46.1"
    }
  }
  required_version = ">= 0.13"
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "loginUser" {
  name = "my-local-key"
  public_key = var.public_key
}

resource "hcloud_firewall" "fw_nginx" {
  name = "mount-ssh-firewall"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "server01" {
  name        = "mount"
  image       = "debian-12"
  server_type = "cx22"
  location    = "nbg1"
  ssh_keys    = [hcloud_ssh_key.loginUser.id]
  firewall_ids = [hcloud_firewall.fw_nginx.id]
  user_data   = local_file.user_data.content
}

resource "hcloud_volume" "volume01" {
  name   = "volume1"
  size   = 10
  format = "xfs"
  location  = "nbg1"
  automount = false
}

resource "hcloud_volume_attachment" "attach01" {
  volume_id = hcloud_volume.volume01.id
  server_id = hcloud_server.server01.id
  automount = false
}

resource "local_file" "user_data" {
  content = templatefile("tpl/userData.yml", {
    volumename = hcloud_volume.volume01.name
    device     = hcloud_volume.volume01.linux_device
  })
  filename = "gen/userData.yml"
}
