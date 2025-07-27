# UserDataMinimal Terraform Module

This module generates a `cloud-init`-compatible `user_data.yml` file for initializing cloud servers (e.g., in Hetzner Cloud).
It helps inject necessary SSH configuration into instances at boot time using a rendered template.

## Features

- Renders a `user_data.yml` file using a `templatefile()` function.
- Injects login username, SSH public key, and host SSH keys.
- Ensures instances are configured automatically with correct access credentials.
- Keeps templates encapsulated inside the module while returning rendered content.

## Module Structure

```text
project-root/
└── modules/
    └── user_data_minimal/      # Terraform module for rendering user_data
        ├── main.tf             # Contains local_file resource using templatefile
        ├── variables.tf        # Inputs required by the template
        ├── outputs.tf          # Exposes rendered content
        └── tpl/
            └── userData.yml    # Template used for cloud-init config
```

## Usage

### Add the module to your root module

```hcl
module "user_data" {
  source           = "../modules/user_data_minimal"
  login_user       = hcloud_ssh_key.loginUser.name
  ssh_public_key   = var.public_key
  host_private_key = tls_private_key.host.private_key_openssh
  host_public_key  = tls_private_key.host.public_key_openssh
}
```

### Use the rendered user_data in a resource

You can now inject the rendered YAML content into a `hcloud_server` resource like this:

```hcl
resource "hcloud_server" "server" {
  name           = "server"
  image          = "debian-12"
  server_type    = "cx22"
  location       = "nbg1"
  ssh_keys       = [hcloud_ssh_key.loginUser.id]
  firewall_ids   = [hcloud_firewall.firewall.id]
  user_data      = module.user_data.user_data_content
}
```

### Template Variables

These variables are passed to the `tpl/userData.yml` template:

- `login_user`: Linux user to create for SSH login.
- `ssh_public_key`: Public key to allow for user login.
- `host_private_key`: Host private key (formatted with `indent`).
- `host_public_key`: Public SSH host key for known_hosts generation.

## Output
```hcl
output "user_data_content" {
  description = "Rendered cloud-init user_data"
  value       = local_file.user_data.content
}
```

You can use `module.user_data.user_data_content` to inject the rendered file anywhere Terraform supports `user_data`.

## Directory Layout (Example)


```text
.
├── main.tf
├── variables.tf
├── outputs.tf
├── gen/
│   └── userData.yml       # ← rendered cloud-init file (optional output)
├── modules/
│   └── user_data_minimal/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── tpl/
│           └── userData.yml   # ← your cloud-init template
```