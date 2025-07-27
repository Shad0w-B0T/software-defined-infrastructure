# Step-by-Step Guide: HTTPS Web Server with Terraform

## Objective

Deploy a Hetzner Cloud server automatically configured with Nginx and HTTPS support via Let's Encrypt certificates.
After deployment, the following URLs should be reachable securely:

- `https://g3.sdi.hdm-stuttgart.cloud`
- `https://www.g3.sdi.hdm-stuttgart.cloud`
- `https://mail.g3.sdi.hdm-stuttgart.cloud`

## Terraform Setup

### Files involved:

```bash
project-root/
├── main.tf               # Infrastructure resources (server, SSH, firewall)
├── outputs.tf            # Outputs (IP address, SSH helper)
├── variables.tf          # Input variables
├── cert.tf               # ACME TLS certificates via Let’s Encrypt
├── dns.tf                # DNS A + CNAME records
├── tpl/
│ └── userData.yml        # Cloud-init template
├── secrets.auto.tfvars
└── gen/
```

## Generate SSL Certificate

Let’s Encrypt (via ACME provider) issues a wildcard certificate (`*.g3.sdi.hdm-stuttgart.cloud`) using the **staging** environment for testing.

### `cert.tf`

```hcl
provider "acme" {
  server_url = "https://acme-staging-v02.api.letsencrypt.org/directory" # staging
}

resource "acme_certificate" "cert" {
  common_name     = "*.${var.dns_zone}"
  dns_challenge {
    provider = "rfc2136"
    config = {
      RFC2136_NAMESERVER     = "ns1.sdi.hdm-stuttgart.cloud"
      RFC2136_TSIG_KEY       = var.dns_key_name
      RFC2136_TSIG_SECRET    = var.dns_secret
    }
  }
}
```

### Output:

- `certificate.pem`
- `private.pem`

These files are saved locally and passed into the cloud-init file via Terraform template.

## DNS Records Creation

Creates A and CNAME records so all subdomains resolve to the server's IP.

### `dns.tf`

```hcl
resource "dns_a_record_set" "root" {
   zone      = "${var.dns_zone}."
   name      = var.server_name
   addresses = [hcloud_server.server.ipv4_address]
   ttl       = 60
}

resource "dns_cname_record" "aliases" {
   count = length(var.server_aliases)
   zone  = "${var.dns_zone}."
   name  = var.server_aliases[count.index]
   cname = "${var.server_name}.${var.dns_zone}."
   ttl   = 60
}
```

This ensures:
- `g3.sdi.hdm-stuttgart.cloud` → A record
- `www`, `mail` → CNAMEs

## Provision Server with Hetzner Cloud

### `main.tf`

```hcl
resource "hcloud_server" "server" {
   name          = "webserver"
   image         = "debian-12"
   server_type   = "cx22"
   location      = "nbg1"
   ssh_keys      = [hcloud_ssh_key.loginUser.id]
   firewall_ids  = [hcloud_firewall.firewall.id]
   user_data     = local_file.user_data.content
}
```

The server is pre-configured with:
- Nginx
- HTTPS
- Certificates from the staging environment


## Nginx Configuration (Cloud-Init)

The generated `userData.yml` applies the certs and sets up Nginx:

```nginx
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name g3.sdi.hdm-stuttgart.cloud;

    ssl_certificate /etc/ssl/certs/certificate.pem;
    ssl_certificate_key /etc/ssl/private/private.pem;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

This is inserted into the server via cloud-init at boot using the `templatefile()` mechanism in:

```hcl
resource "local_file" "user_data" {
   content = templatefile("tpl/userData.yml", {
      loginUser        = hcloud_ssh_key.loginUser.name,
      ssh_public_key   = var.public_key,
      host_private_key = indent(4, tls_private_key.host.private_key_openssh),
      host_public_key  = tls_private_key.host.public_key_openssh
      certificate_pem  = indent(6, local_file.cert_pem.content),
      private_key_pem  = indent(6, local_file.private_pem.content),
      server_name      = var.server_name,
      dns_zone         = var.dns_zone
   })
   filename = "gen/userData.yml"
}
```

## Apply the Infrastructure

```bash
terraform init
terraform apply
```

Terraform will:
- Register DNS records
- Request a certificate via ACME
- Create a cloud-init configuration
- Launch the server
- Inject Nginx + certificates

## Verification Steps

Once the server is deployed:

1. Open a browser and visit:
   - `https://g3.sdi.hdm-stuttgart.cloud`
   - `https://www.g3.sdi.hdm-stuttgart.cloud`
   - `https://mail.g3.sdi.hdm-stuttgart.cloud`

2. Check the padlock in the address bar.

3. View certificate details:
   - **Issuer**: Let's Encrypt (Staging or Production)
   - **Subject**: `*.g3.sdi.hdm-stuttgart.cloud`
   - **Chain**: `R10` → `ISRG Root X1` (Production only)


## Certificate

### Staging Environment:
The certificate is issued by Let's Encrypt **staging** environment.
This version is used for testing and may result in browser warnings.

<ImageWithCaption  
src="/images/exercise_24/cert_staging.png"  
alt="Staging Certificate"  
:caption="'Staging Certificate in Browser'"  
:number="1"  
/>
<br>
<ImageWithCaption  
src="/images/exercise_24/cert_staging_overview.png"  
alt="Staging Certificate Overview"  
:caption="'Staging Certificate in Browser Overview'"  
:number="2"  
/>

### Production Environment:

The certificate is now issued by Let's Encrypt **production** environment.
This is a valid certificate and should be accepted by all modern browsers without warnings.
The issuing chain ends in the **R10 Intermediate CA**, which chains to **ISRG Root X1**. ([R10](../exercise_23/r10.md))

<ImageWithCaption  
src="/images/exercise_24/cert_production.png"  
alt="Production Certificate"  
:caption="'Production Certificate in Browser'"  
:number="3"  
/>
<br>
<ImageWithCaption  
src="/images/exercise_24/cert_production_overview.png"  
alt="Production Certificate Overview"  
:caption="'Production Certificate in Browser Overview'"  
:number="4"  
/>

## Notes

- Certificate generation should happen **before** provisioning the server, so that the resulting `certificate.pem` and `private.pem` can be uploaded.
- Nginx should be automatically configured to serve traffic via HTTPS using these certificate files.
- Ensure DNS records for all three subdomains exist and point to the server IP.
- You can use Terraform provisioners or user data (`cloud-init`) to install and configure Nginx during server creation.


## Moving to Production

To switch from staging to production:

In `cert.tf`, comment out the staging ACME provider and enable the production one:

```hcl
# staging
# server_url = "https://acme-staging-v02.api.letsencrypt.org/directory"

# production
server_url = "https://acme-v02.api.letsencrypt.org/directory"
```

Then run:

```bash
terraform apply -replace=acme_certificate.cert
```

## Verification Steps

1. Open a browser and visit each of the URLs.
2. Check that the connection is secure.
3. Inspect the certificate details to verify:
   - Issuer is **Let's Encrypt**
   - Subject includes the expected domain (e.g., `*.g3.sdi.hdm-stuttgart.cloud`)
   - Certificate chain includes **R10** → **ISRG Root X1**

This setup combines infrastructure provisioning with secure certificate management,
enabling a production-ready HTTPS deployment with one `terraform apply`.