# Testing Your Web Certificate with Nginx

In this guide, you'll validate the wildcard TLS certificate generated via Let's Encrypt by installing and 
configuring **Nginx** on your server.
You will create multiple DNS records and modify Nginx to serve HTTPS traffic using your custom certificate.

You’ll test the validity of the certificate across multiple subdomains and learn how to inspect and troubleshoot HTTPS
issues using a browser and Nginx tools.

:::tip 💡 Tip

Always test with Let's Encrypt's **staging environment** before switching to the production 
ACME server to avoid rate limits or temporary bans.
:::

## Prerequisites

- You have created a valid wildcard certificate using Terraform and Let's Encrypt (see *Creating a Web Certificate*)
- The generated files (`certificate.pem` and `private.pem`) are available in your local `gen/` folder
- Your `config.auto.tfvars` defines the domain and subdomains to use:

```hcl
dnsZone     = "g3.sdi.hdm-stuttgart.cloud"
serverNames = ["www", "mail"]
```
