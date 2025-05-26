#!/bin/bash

# Update & install Nginx
apt-get update
apt-get install -y nginx

# Replace default index.html with custom content
echo "Hallo Welt" > /var/www/html/index.html

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx
