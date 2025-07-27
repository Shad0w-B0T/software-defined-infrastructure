# Step-by-Step

## Copy the Certificate to the Server

Use either `scp` or a Terraform `remote-exec` provisioner to copy the generated files:

Zertifikat kopieren auf den Server (per scp oder mit terraform provisioner):

- `certificate.pem` → `/etc/ssl/certs/certificate.pem`
- `private.pem` → `/etc/ssl/private/private.pem`

These files are produced by Terraform as part of the certificate creation process using Let's Encrypt.

## Choose the Right ACME Server URL

There are two ACME endpoints you can use:

```text
# For testing:
server_url = "https://acme-staging-v02.api.letsencrypt.org/directory"

# For production:
server_url = "https://acme-v02.api.letsencrypt.org/directory"
```

::: warning ⚠️ Warning

Use the staging environment first to avoid hitting rate limits. Only switch to production after confirming the configuration works.

:::

## Configure Nginx for HTTPS

Edit `/etc/nginx/sites-available/default` and update the server block as follows:

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

## Validate and Restart Nginx

Test the configuration:

```bash
nginx -t
```

If successful, restart the Nginx service:

```bash
sudo systemctl restart nginx
```

##  Create a Test Page

Since there's no index file by default, you can add a placeholder:

```bash
echo "Hello World" | sudo tee /var/www/html/index.html > /dev/null
```

Now, visiting the URLs will return a valid page instead of a 401 error.

## Testing the Setup

Visit the following URLs in your browser:

> https://g3.sdi.hdm-stuttgart.cloud

> https://www.g3.sdi.hdm-stuttgart.cloud

> https://mail.g3.sdi.hdm-stuttgart.cloud

This configuration enables HTTPS using your custom certificate and serves content from /var/www/html.

## Visual Example

You should now see your certificate details in the browser:

### Staging Certificate (with warning):

<ImageWithCaption
src="/images/exercise_23/cert_staging.png"
alt="Staging Cert"
:caption="'Staging Cert'"
:number="1"
/>

As shown, the certificate is issued by Let's Encrypt, but from the **staging** environment, 
which causes the browser to display a security warning.


### Production Certificate (no warning):

<ImageWithCaption
src="/images/exercise_23/cert_production.png"
alt="Production Cert"
:caption="'Production Cert'"
:number="2"
/>

Here, the certificate is also issued by Let's Encrypt, but from the production environment.
The certificate is valid and trusted, and the common name (`R10`) is correctly covered by the issued certificate.
