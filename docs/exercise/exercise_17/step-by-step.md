# SSH Host Key Handling with Terraform Module

This module solves the problem of SSH known host verification in dynamic infrastructure environments.
It securely generates a custom `known_hosts` file and provides wrapper scripts for `ssh` and `scp`
to enable non-interactive, trusted access to Terraform-provisioned servers.


## Example Project Structure

```shell
project-root/
├── main.tf
├── outputs.tf
├── variables.tf
├── tpl/
│ ├── ssh.sh
│ ├── scp.sh
│ └── userData.yml
├── bin/
│ ├── ssh
│ └── scp
├── gen/
│ └── known_hosts
└── Modules/
└── SshKnownHosts/
```

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


## Example SSH Usage

After running `terraform apply`, you can connect using the generated wrapper:

```bash
./bin/ssh
```

```bash
./bin/scp ./local.txt root@<ip>:/root/
```
