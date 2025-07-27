# Step-by-Step: Creating a web certificate

This guide explains how to generate a **wildcard TLS certificate** for `*.g3.sdi.hdm-stuttgart.cloud` using Terraform, 
Let's Encrypt (ACME), and RFC2136 DNS challenge.

You will create and store the private key and certificate locally in the `/gen` folder.

## Run Terraform

1. Clone your Terraform configuration into your working directory.
2. Ensure you have the following file structure in your project root:

```bash
project-root/
├── main.tf
├── outputs.tf
├── variables.tf
├── secrets.auto.tfvars
├── gen/
```

3. Copy `secrets.auto.tfvars.template` to `secrets.auto.tfvars` and fill in your secrets:

```hcl
dns_key_name = "g3.key"
dns_secret   = "<your-tsig-secret>"
contact_mail = "you@example.com"
```

4. Run:

```bash
terraform init
terraform plan
terraform apply
```

## Register an ACME account (staging)

Terraform automatically registers an ACME (Let's Encrypt) account using:

- A generated RSA private key (2048 bits)
- Your provided email address (can be a dummy)
- The staging endpoint: `https://acme-staging-v02.api.letsencrypt.org/directory`

The registration is done via the `acme_registration` resource.

```hcl
resource "acme_registration" "reg" {
  account_key_pem = tls_private_key.cert_key.private_key_pem
  email_address   = var.contact_mail
}
```


## Create a wildcard certificate for *.g3.sdi.hdm-stuttgart.cloud

Terraform requests a wildcard certificate through the `acme_certificate` resource using the DNS-01 challenge method.

It uses the `rfc2136` provider to authenticate DNS updates against the nameserver `ns1.sdi.hdm-stuttgart.cloud` using your provided TSIG credentials.

This certificate will cover:

- `*.g3.sdi.hdm-stuttgart.cloud` (wildcard)
- It will be valid for subdomains like:
    - `www.g3.sdi.hdm-stuttgart.cloud`
    - `mail.g3.sdi.hdm-stuttgart.cloud`

:::warning ⚠️ Warning
You must have permissions to update DNS records in the zone `g3.sdi.hdm-stuttgart.cloud`.
:::


## Save the private key and certificate in the /gen folder

After successful issuance, the following files are generated using the `local_file` resource:

- `/gen/private.pem`: The generated private key
- `/gen/certificate.pem`: The issued wildcard certificate

You can now install these files in your Nginx server or any TLS-enabled service.


## Completion Criteria

- The wildcard certificate is issued for your DNS zone
- Files `private.pem` and `certificate.pem` exist in your `/gen` folder
- DNS challenge was fulfilled via **RFC2136** updates to your DNS provider

You may now test your certificate on a server and move to production by switching the ACME endpoint from 
``staging`` to ``production``.

