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
  name       = "my-local-key"
  public_key = file("~/.ssh/id_ed25519.pub")
}

resource "hcloud_firewall" "fw_nginx" {
  name = "nginx-ssh-firewall"

  rule {
    direction   = "in"
    protocol    = "tcp"
    port        = "22"
    source_ips  = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction   = "in"
    protocol    = "tcp"
    port        = "80"
    source_ips  = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "nginxServer" {
  name           = "nginx-server"
  image          = "debian-12"
  server_type    = "cx22"
  location       = "nbg1"
  ssh_keys       = [hcloud_ssh_key.loginUser.id]
  firewall_ids   = [hcloud_firewall.fw_nginx.id]
}

resource "hcloud_volume" "volume01" {
  name      = "volume1"
  size      = 10
  server_id = hcloud_server.nginxServer.id
  automount = true
  format    = "xfs"
}
