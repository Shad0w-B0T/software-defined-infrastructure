# Summary

This guide demonstrates how to **combine TLS certificate generation** and **web server provisioning** into a 
single Terraform configuration using ``Let's Encrypt`` and ``Hetzner Cloud``.

By integrating infrastructure and security setup, you eliminate manual post-deployment tasks and ensure your
Nginx server is ready with HTTPS out-of-the-box.

## Key Takeaways

- **Wildcard certificate creation** via the ACME provider and DNS-01 challenge using RFC2136.
- Terraform configuration provisions:
    - Hetzner Cloud instance
    - DNS records for apex and subdomains (`www`, `mail`)
    - Wildcard certificate (`*.example.com`)
    - Cloud-init user data with Nginx and certs
- Immediate validation by visiting your HTTPS-enabled domains in the browser.
- Certificate testing is done in the **staging** environment first to avoid rate limits.
- Easy switch to **production** once setup is verified.

## Deployment Workflow

1. Configure Terraform with DNS zone, ACME credentials, and Hetzner settings.
2. Generate a wildcard certificate via Let's Encrypt (staging).
3. Provision the server with cloud-init and pre-baked certs.
4. Automatically configure Nginx to serve HTTPS traffic.
5. Validate certificate status and HTTPS access via browser or CLI tools.
6. Transition to Let's Encrypt **production** endpoint for real deployment.

## Further Resources & References

- [Let's Encrypt Staging & Production APIs](https://letsencrypt.org/docs/staging-environment/)
- [Terraform ACME Provider](https://registry.terraform.io/providers/vancluever/acme/latest/docs)
- [RFC2136 DNS Updates](https://tools.ietf.org/html/rfc2136)
- [Nginx HTTPS Setup Docs](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [OpenSSL CLI for Certificate Testing](https://www.openssl.org/docs/man1.1.1/man1/openssl-s_client.html)
