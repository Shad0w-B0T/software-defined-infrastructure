# Configure with terraform

```shell
hetzner-nginx-server/
├── main.tf
├── variables.tf
├── terraform.tfvars
├── public.key
├── tpl/
│   └── userData.yml
```

## main.tf

```terraform
provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "default" {
  name       = "devops-key"
  public_key = file("public.key")
}

resource "hcloud_server" "helloServer" {
  name        = "hello"
  image       = "debian-12"
  server_type = "cx22"
  ssh_keys    = [hcloud_ssh_key.default.name]
  user_data   = local_file.user_data.content
}

resource "hcloud_volume" "volume01" {
  name      = "volume1"
  size      = 10
  server_id = hcloud_server.helloServer.id
  automount = true
  format    = "xfs"
}

resource "local_file" "user_data" {
  content  = templatefile("tpl/userData.yml", {
    volume_id = hcloud_volume.volume01.id
  })
  filename = "gen/userData.yml"
}

output "server_ip" {
  value = hcloud_server.helloServer.ipv4_address
}

output "volume_id" {
  value = hcloud_volume.volume01.id
}
```

## variables.tf

```terraform
variable "hcloud_token" {
  type        = string
  description = "Hetzner Cloud API Token"
  sensitive   = true
}
```

## terraform.tfvars

```terraform
hcloud_token = "your-hetzner-api-token-here"
```

## tpl/userData.yml

```yaml
#cloud-config
runcmd:
- apt update && apt -y upgrade
- mkdir -p /volume01
- echo "/dev/disk/by-id/scsi-0HC_Volume_${volume_id} /volume01 xfs discard,nofail,defaults 0 0" >> /etc/fstab
- mount -a
```

## public.key

```shell
your keys
```