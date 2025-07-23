# Introduction

TBD

Zertifikat kopieren auf den Server (per scp oder mit terraform provisioner):

    certificate.pem → /etc/ssl/certs/certificate.pem

    private.pem → /etc/ssl/private/private.pem

# server_url = "https://acme-staging-v02.api.letsencrypt.org/directory" # staging
server_url = "https://acme-v02.api.letsencrypt.org/directory" # production

In /etc/nginx/sites-available/default

```text
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

```bash
nginx -t
sudo systemctl restart nginx
```

Kein 401 error weil index.hmtl nicht vorhandn, pfush aber geht

```bash
echo "Hello World" | sudo tee /var/www/html/index.html > /dev/null
```

> https://g3.sdi.hdm-stuttgart.cloud
> https://www.g3.sdi.hdm-stuttgart.cloud
> https://mail.g3.sdi.hdm-stuttgart.cloud

Zugriffstest im Browser: Wenn du eine Seite siehst (auch mit Warnung wegen Staging-Zertifikat), ist das erstmal OK.

<ImageWithCaption 
    src="/images/exercise_23/cert_staging.png" 
    alt="" 
    :caption="''" 
    :number="1" 
/>

<ImageWithCaption
    src="/images/exercise_23/cert_production.png" 
    alt="" 
    :caption="''"
    :number="2"
/>
