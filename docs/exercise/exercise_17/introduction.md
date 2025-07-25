# Introduction

This module provides a reusable solution to handle SSH host key verification in Terraform-managed Hetzner infrastructure.
When creating new servers dynamically, standard SSH and SCP commands may fail or prompt for confirmation due to missing
or mismatched host keys in `~/.ssh/known_hosts`.

To solve this, the `SshKnownHosts` module generates:

- A custom `known_hosts` file based on the server’s IP and SSH public key
- SSH and SCP wrapper scripts that enforce non-interactive, secure access using this ``known_hosts`` file

By using this module, you can replace custom script snippets across your Terraform projects with a single declarative 
module block, simplifying infrastructure-as-code maintenance and improving reliability.

## Prerequisites

Before using the `SshKnownHosts` module, ensure the following are in place:

- A working Hetzner Cloud project with API token
- Terraform CLI installed and initialized (`terraform init`)
- An `hcloud_ssh_key` resource representing your login key
- A provisioned server (`hcloud_server`) with a reachable IPv4 address
- The SSH public host key for the server, provided via a `tls_private_key` resource or similar
- Directory structure:
    - `tpl/`: contains the wrapper script templates
    - `gen/`: receives the generated `known_hosts` file
    - `bin/`: receives the generated SSH and SCP wrapper scripts

With these prerequisites satisfied, you can call the module like this:
