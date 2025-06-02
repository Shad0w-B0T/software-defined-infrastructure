terraform {
  required_providers {
    hcloud = {
      source = "hetznercloud/hcloud"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "loginUser" {
  name       = "my-local-key"
  public_key = file("~/.ssh/id_ed25519.pub")
}

resource "hcloud_firewall" "fw" {
  name = "webserver-fw"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "caddyServer" {
  name        = "caddy-server"
  image       = "debian-12"
  server_type = "cx22"
  ssh_keys = [hcloud_ssh_key.loginUser.id]
  firewall_ids = [hcloud_firewall.fw.id]
  user_data = file("caddy-init.sh")
}

