# Creating a Secure Hetzner Server with Terraform

## Project Structure

```shell
project-root/
├── main.tf                      # Terraform configuration with firewall, ssh key and server
├── variables.tf                 # Variable definitions (e.g. API token)
├── outputs.tf                   # Outputs like IP and datacenter
└── secrets.auto.tfvars.template # Template for secure token handling
```

## Minimal Configuration with SSH and Firewall Rule

We take the config from the minimal server setup and extend it by:
- Adding an SSH key
- Outsourcing the API token from the main config

### Secure Your Variables

Avoid putting your token or key directly in `main.tf`. The other options is by following this guide about the [environment](/collection/environment.html).

#### 1. Prepare a secret file from a template

```shell
cp secrets.auto.tfvars.template secrets.auto.tfvars
```

#### 2. Edit the file and insert your API token and SSH public key

```shell
nano secrets.auto.tfvars
```

Example:

```hcl
# secrets.auto.tfvars
hcloud_token = "your_real_hetzner_token_here"
public_key   = "your_public_key"
```

## Initialize and Deploy Instructions

From your project root:

```shell
terraform init
terraform apply
```

Confirm the plan with `yes`.

### Output Example

```shell
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

Outputs:

hello_datacenter = "hel1-dc2"
hello_ip_addr    = "37.27.206.215"
```

Rewind: [Terraform commands](../../../infrastructure-setup/terraform.md#how-to-use-terraform)

## SSH Login (No Password)

Use your private key to connect:

```shell
C:\Users\Daniel>ssh root@37.27.206.215
The authenticity of host '37.27.206.215 (37.27.206.215)' can't be established.
ED25519 key fingerprint is SHA256:1zUSY1lPDrzxBJYt5p3m1evvHE3pNGuF8HiQMRZMJY4.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '37.27.206.215' (ED25519) to the list of known hosts.
Linux hello 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
root@hello:~#
```

---

## Versioning & Security Notes

### Why Use `.tfvars`?

Terraform automatically loads `.auto.tfvars` files. You should never hardcode secrets in `main.tf`.

### Keep Secrets Out of Git

Ensure the secrets file is in your `.gitignore`:

```gitignore
# .gitignore
secrets.auto.tfvars
```

Always double-check with:

```shell
git status
```

to confirm secrets aren't tracked.