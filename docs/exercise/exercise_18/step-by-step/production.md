# Production

Once you've verified that everything works in staging, it's time to request a real certificate from Let's Encrypt's **production environment**.

## Clean and Reset the Nginx Configuration

Empty the previous staging configuration file:

```bash
sudo > /etc/nginx/sites-available/g3
```

Then edit the configuration with:

```bash
sudo nano /etc/nginx/sites-available/g3
```

Insert the following configuration:

```bash
server {
    listen 80;
    server_name g3.sdi.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Request a Production Certificate

Now request a production TLS certificate using Certbot:

```bash
sudo certbot --nginx -d g3.sdi.hdm-stuttgart.cloud -d www.g3.sdi.hdm-stuttgart.cloud
```

Certbot will automatically:

- Generate and install a trusted certificate
- Configure HTTPS and redirect HTTP
- Add SSL configuration to your Nginx site file

## Auto-Generated Nginx Configuration (by Certbot)

Certbot will modify your Nginx config like this:

```bash
server {
    server_name g3.sdi.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.g3.sdi.hdm-stuttgart.cloud) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = g3.sdi.hdm-stuttgart.cloud) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name g3.sdi.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud;
    return 404; # managed by Certbot
}
```

## Open in Browser

::: warning ⚠️ **Important:**
Make sure your Hetzner cloud firewall configuration allows **port 443** (HTTPS). Otherwise, secure access will not work externally.
:::

Your site should now be accessible over a valid HTTPS connection:

> https://g3.sdi.hdm-stuttgart.cloud

<ImageWithCaption src="/images/exercise_18/cert_real.png" alt="HTTPS with valid production certificate" :caption="'The website is successfully secured with a valid TLS certificate from Let’s Encrypt production environment (trusted by all browsers).'" :number="1" />

## Verify the Certificate Issuer

To confirm that the certificate comes from the **production** CA (not staging), run:

```bash
sudo openssl x509 -in /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/fullchain.pem -text | grep "CA Issuers"
```

Expected output for a production certificate:

```bash
CA Issuers - URI:http://e6.i.lencr.org/
```

This confirms that your TLS certificate is valid, trusted, and issued by Let's Encrypt's production authority.
