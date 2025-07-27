# Combining Certificate Generation and Server Creation

This guide walks you through combining 
[Terraform-based server provisioning](../exercise_22/introduction.md#creating-a-wildcard-tls-certificate-with-lets-encrypt-and-terraform) 
with the 
[automated generation of a wildcard TLS certificate](../exercise_23/introduction.md#testing-your-web-certificate-with-nginx)
using Let's Encrypt — all within a single configuration.

By integrating the certificate creation process into your server deployment pipeline, 
you reduce manual steps and ensure that your Nginx server is automatically secured with HTTPS from the start.

## Prerequisites

- You have access to a DNS zone (e.g., `g03.sdi.hdm-stuttgart.cloud`) with write permissions
- Your domain provider supports **RFC2136** for DNS updates (used for the DNS-01 challenge)
- Terraform CLI is installed and initialized
- Your Terraform configuration includes:
  - A `config.auto.tfvars` like:

```hcl
dnsZone     = "g03.sdi.hdm-stuttgart.cloud"
serverNames = ["www", "mail"]
```

- The latest [acme Terraform provider](https://registry.terraform.io/providers/vancluever/acme/latest)
- A defined Hetzner cloud server (`hcloud_server`) using a supported image (e.g., Debian 11)
- The `local_file` resource for writing generated certificate files (`certificate.pem`, `private.pem`) to the `gen/` directory
- DNS entries for your base domain and subdomains point to your Hetzner server's IP
- SSH access to the server and permissions to install and restart `nginx`

:::tip 🚨 **Important:**  
Always test with Let’s Encrypt’s **staging directory** first (`https://acme-staging-v02.api.letsencrypt.org/directory`) 
to avoid hitting rate limits. Switch to the production API only after verifying that your setup works.
:::

With this combined approach, your infrastructure will be deployed and secured in a single, declarative Terraform run.
