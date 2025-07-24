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
  public_key = var.public_key
}

resource "hcloud_firewall" "fw_nginx" {
  name = "nginx-ssh-firewall"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "local_file" "known_hosts" {
  content         = "${hcloud_server.server.ipv4_address} ${tls_private_key.host.public_key_openssh}"
  filename        = "${path.module}/gen/known_hosts"
  file_permission = "0644"
}

resource "tls_private_key" "host" {
  algorithm = "ED25519"
}

# Generate cloud-init user data using template
resource "local_file" "user_data" {
  content = templatefile("tpl/userData.yml", {
    loginUser        = "devops",
    ssh_public_key   = var.public_key,
    host_private_key = indent(4, tls_private_key.host.private_key_openssh),
    host_public_key  = tls_private_key.host.public_key_openssh
  })
  filename = "gen/userData.yml"
}

resource "local_file" "ssh_script" {
  content = templatefile("${path.module}/tpl/ssh.sh", {
    ip = hcloud_server.server.ipv4_address
  })
  filename        = "${path.module}/bin/ssh"
  file_permission = "0755"
  depends_on      = [local_file.known_hosts]
}

resource "local_file" "scp_script" {
  content = templatefile("${path.module}/tpl/scp.sh", {
    ip = hcloud_server.server.ipv4_address
  })
  filename        = "${path.module}/bin/scp"
  file_permission = "0755"
  depends_on      = [local_file.known_hosts]
}


resource "hcloud_server" "server" {
  name         = "server"
  image        = "debian-12"
  server_type  = "cx22"
  location     = "nbg1"
  ssh_keys     = [hcloud_ssh_key.loginUser.id]
  firewall_ids = [hcloud_firewall.fw_nginx.id]
  user_data    = local_file.user_data.content
}
