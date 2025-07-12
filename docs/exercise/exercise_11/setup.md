# 🧭 Step-by-Step Guide: Provisioning a Secure Hetzner Server with Terraform

## 📁 1. Project Structure

```shell
project-root/
├── main.tf                      # Terraform configuration with firewall, ssh key and server
├── variables.tf                 # Variable definitions (e.g. API token)
├── outputs.tf                   # Outputs like IP and datacenter
└── secrets.auto.tfvars.template # Template for secure token handling
```

## 🛠️ 2. Prerequisites

Make sure the following tools and configurations are available:

- Terraform → `terraform -v`
- SSH keypair
- Hetzner API Token from Hetzner Console

## 🔐 3. Secure Your Hetzner API Token

Avoid putting your token directly in `main.tf`.

### 3.1 Prepare secret template

Instead:

```shell
cp secrets.auto.tfvars.template secrets.auto.tfvars
```

### 3.2 Edit the file and insert your API token

```shell
nano secrets.auto.tfvars
```

Example:

```shell
hcloud_token = "your_real_hetzner_token_here"
```

## 🚀 4. Initialize and Deploy

From the project root, run:

```shell
terraform init
```

Then:

```shell
terraform apply
```

Review the plan, type `yes` to approve.

On success, you’ll see:

```shell
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

Outputs:

hello_datacenter = "hel1-dc2"
hello_ip_addr = "37.27.206.215"
```

## 🔐 5. SSH Login (No Password)

Login securely with your private key:

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
