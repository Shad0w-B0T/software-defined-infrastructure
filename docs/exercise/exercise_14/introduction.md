# SSH & SCP Wrappers with Preloaded known_hosts

This guide explains how to automatically generate SSH and SCP wrapper scripts for secure and hassle-free access 
to a server provisioned with Terraform. These wrappers rely on a pre-generated `known_hosts` file to 
avoid interactive prompts and security warnings related to unknown SSH host keys.

In a typical workflow, when connecting to a newly created server via SSH, the user is prompted to accept 
the server's host key. This prompt can interrupt automation or scripts. To prevent that, we include the server’s 
SSH host key in a pre-built `known_hosts` file and configure custom wrapper scripts (`bin/ssh` and `bin/scp`) to use it.

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install)
- A valid **Hetzner Cloud API token** ([How to create one](https://docs.hetzner.cloud/#overview-getting-started))
- A local **SSH keypair** for secure login ([Generate with ssh-keygen](https://www.ssh.com/academy/ssh/keygen))
- **Extracted SSH Host Key**  
  You must retrieve the SSH host key fingerprint for your created server and write it to a file like `gen/known_hosts`. 
