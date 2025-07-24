# SSH Host Key Handling with Terraform Module

A module for safely managing SSH known hosts and wrapper scripts for ssh and scp access.

## Usage

### Create your server and key

```hcl
resource "hcloud_server" "helloServer" {
name = "hello"
image = "debian-12"
server_type = "cx22"
ssh_keys = [hcloud_ssh_key.loginUser.name]
}

resource "tls_private_key" "host" {
algorithm = "ED25519"
}

resource "hcloud_ssh_key" "loginUser" {
name = "terraform-login-user"
public_key = ...PATH_TO_KEY...
}
```

### Use the SshKnownHosts module

```hcl
module "createSshKnownHosts" {
source = "../Modules/SshKnownHosts"
loginUserName = hcloud_ssh_key.loginUser.name
serverNameOrIp = hcloud_server.helloServer.ipv4_address
serverHostPublicKey = tls_private_key.host.public_key_openssh
}
```

### Define outputs

```hcl
output "ssh_command" {
value = "bin/ssh"
description = "SSH Wrapper command"
}

output "scp_command" {
value = "bin/scp <local-file> ${hcloud_ssh_key.loginUser.name}@${hcloud_server.helloServer.ipv4_address}:<target-path>"
}
```

## Module inputs

| Name                  | Type   | Description                              |
| --------------------- | ------ | ---------------------------------------- |
| `loginUserName`       | string | The login user on the VM                 |
| `serverNameOrIp`      | string | IP or DNS name of the target             |
| `serverHostPublicKey` | string | The server’s public key (OpenSSH format) |


## Prerequisites

- test
- test