# Enable HTTPS with Let's Encrypt (Staging)

## Configure Nginx HTTP Server Block

Create a new configuration file for your domain:

```bash
sudo nano /etc/nginx/sites-available/g3
```

Insert the following content:

```text
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

## Enable the Site and Reload Nginx

Create a symbolic link to enable the site configuration and verify the Nginx setup. Then, reload Nginx to apply the changes:

```shell
sudo ln -s /etc/nginx/sites-available/g3 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Install Certbot and the Nginx Plugin

```shell
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

## Obtain a Staging Certificate

Use Let's Encrypt’s **staging environment** to avoid rate limits during testing:

```bash
sudo certbot --nginx --staging -d g3.sdi.hdm-stuttgart.cloud -d www.g3.sdi.hdm-stuttgart.cloud
```

Example Output (Shortened)

```bash
Enter email address (used for urgent renewal and security notices): dr092@hdm-stuttgart.de
...
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/privkey.pem

Successfully deployed certificate for g3.sdi.hdm-stuttgart.cloud
Successfully deployed certificate for www.g3.sdi.hdm-stuttgart.cloud

Congratulations! You have successfully enabled HTTPS on:
 - https://g3.sdi.hdm-stuttgart.cloud
 - https://www.g3.sdi.hdm-stuttgart.cloud
```

## Open in browser

::: warning ⚠️ **Important:**
Make sure your Hetzner cloud firewall configuration allows **port 443** (HTTPS). Otherwise, secure access will not work externally.
:::

Once the staging certificate has been successfully issued and deployed, you can open your site in a browser:

> https://g3.sdi.hdm-stuttgart.cloud

Note that your browser will likely show a warning because the certificate was issued by Let's Encrypt's **staging environment**,
which is intended for testing purposes and is **not trusted** by browsers.

<ImageWithCaption src="/images/exercise_18/cert_staging.png" alt="HTTPS using staging" :caption="'The website is accessible via HTTPS, but the certificate is issued by Let\'s Encrypt\'s staging environment (not trusted in browsers)'" :number="1" />

## Verify Certificate (Optional)

You can verify whether the issued TLS certificate comes from Let's Encrypt's **staging** environment (used for testing) 
or from the **production** environment (trusted by browsers).

Run the following command to inspect the certificate's issuer:

```bash
sudo openssl x509 -in /etc/letsencrypt/live/g3.sdi.hdm-stuttgart.cloud/fullchain.pem -text | grep "CA Issuers"
```

Expected output (for staging):

```text
CA Issuers - URI:http://stg-e5.i.lencr.org/
```

If you see a URI starting with `http://stg-`, it means you're still using the **staging** certificate. 
This is useful for confirming that you haven't yet switched to a production certificate, which is important to 
avoid hitting Let's Encrypt's rate limits during testing.
