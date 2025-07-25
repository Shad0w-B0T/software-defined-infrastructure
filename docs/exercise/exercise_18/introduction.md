# Enhancing Your Web Server with DNS and HTTPS (Let's Encrypt)

This guide walks you through enhancing the accessibility and security of your Nginx-based 
web server hosted on Hetzner Cloud.  
You will set up custom DNS records and secure your site with HTTPS using Let's Encrypt,
ensuring trusted access to both `www` and root subdomains.

By the end, you’ll have:

- A public domain pointing to your server
- Automatic HTTPS certificates for both `g03.sdi.hdm-stuttgart.cloud` and `www.g03.sdi.hdm-stuttgart.cloud`
- TLS-enabled access with auto-renewal support

This is based on 
[How To Secure Nginx with Let's Encrypt on Debian 11](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-11),
adapted for Hetzner Cloud and Terraform-provisioned infrastructure.

## Prerequisites

- A running Debian 11 server (e.g., provisioned via Terraform and Hetzner)
- Nginx installed and running (basic HTML or reverse proxy)
- Domain access to `*.sdi.hdm-stuttgart.cloud` (e.g., `g03.sdi.hdm-stuttgart.cloud`)
- Two DNS `A` records:
    - `g03.sdi.hdm-stuttgart.cloud` → your server’s public IP
    - `www.g03.sdi.hdm-stuttgart.cloud` → your server’s public IP
- SSH access to the server
- A configured firewall (e.g., Hetzner Cloud firewall allowing ports 22, 80, 443)
- Domain propagation verified via `dig` or `nslookup`
- Root or `sudo` access on the server

### Optional but Recommended

- Use Let's Encrypt’s staging environment (`--staging`) during testing to avoid hitting real certificate rate limits.
- Familiarity with Certbot and Nginx configuration
