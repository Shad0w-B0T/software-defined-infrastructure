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
  name       = "devops"
  public_key = file("~/.ssh/id_ed25519.pub")
}

resource "hcloud_firewall" "firewall" {
  name = "nginx-ssh-firewall"

  rule {
    direction   = "in"
    protocol    = "tcp"
    port        = "22"
    source_ips  = ["0.0.0.0/0", "::/0"]
  }
}

resource "tls_private_key" "host" {
  algorithm = "ED25519"
}

module "createSshKnownHosts" {
  source               = "../modules/ssh_known_hosts"
  loginUserName        = hcloud_ssh_key.loginUser.name
  serverNameOrIp       = hcloud_server.server.ipv4_address
  serverHostPublicKey  = tls_private_key.host.public_key_openssh
}

# Generate cloud-init user data using template
resource "local_file" "user_data" {
  content  = templatefile("tpl/userData.yml", {
    loginUser        = hcloud_ssh_key.loginUser.name,
    ssh_public_key   = file("~/.ssh/id_ed25519.pub"),
    host_private_key  = indent(4, tls_private_key.host.private_key_openssh),
    host_public_key  = tls_private_key.host.public_key_openssh
  })
  filename = "gen/userData.yml"
}

resource "hcloud_server" "server" {
  name           = "server"
  image          = "debian-12"
  server_type    = "cx22"
  location       = "nbg1"
  ssh_keys       = [hcloud_ssh_key.loginUser.id]
  firewall_ids   = [hcloud_firewall.firewall.id]
  user_data      = local_file.user_data.content
}
