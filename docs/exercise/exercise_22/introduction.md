# Creating a Wildcard TLS Certificate with Let's Encrypt and Terraform

This guide demonstrates how to programmatically obtain a **wildcard TLS certificate** for your DNS zone 
(e.g., `g03.sdi.hdm-stuttgart.cloud`) using Terraform and the ACME protocol with DNS-based validation.

You will use the `acme_certificate` resource in combination with the `rfc2136` DNS provider to generate a 
wildcard certificate that secures:

- Your zone apex (e.g., `g03.sdi.hdm-stuttgart.cloud`)
- All subdomains via `*.g03.sdi.hdm-stuttgart.cloud`

This approach is ideal for securing multiple web services (e.g., `www`, `mail`, `api`) 
under the same domain with a single certificate.

:::tip 💡️ **Important:** 
Always use Let's Encrypt's **staging** API (`https://acme-staging-v02.api.letsencrypt.org/directory`)
during testing to avoid hitting rate limits.
:::

Once validated, Terraform will generate the following files (via `local_file` resources):

- `gen/private.pem` – your private key
- `gen/certificate.pem` – the wildcard TLS certificate

You can then use these files in your web server (e.g., Nginx) for secure HTTPS hosting.

## Prerequisites

- You control a DNS zone (e.g., `g03.sdi.hdm-stuttgart.cloud`) and have access credentials for dynamic updates (RFC 2136)
- Working Terraform project
- Your `terraform` configuration includes:
    - The `acme` provider
    - The `rfc2136` DNS provider
- A `gen/` folder in your project where the output files will be stored
- Basic knowledge of Terraform resources like `acme_certificate` and `local_file`
- You’re using Let's Encrypt’s **staging environment** during testing:

```hcl
server_url = "https://acme-staging-v02.api.letsencrypt.org/directory"
```