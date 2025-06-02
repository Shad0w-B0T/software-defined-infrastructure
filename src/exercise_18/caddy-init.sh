#!/bin/bash

DOMAIN="www.g3.sdi.hdm-stuttgart.cloud"

# Update & install Caddy
apt-get update
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

apt-get update
apt-get install -y caddy

echo "Hallo Welt" > /var/www/html/index.html

cat <<EOF > /etc/caddy/Caddyfile
$DOMAIN {
    root * /var/www/html
    file_server
}
EOF

systemctl reload caddy
