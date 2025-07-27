#!/bin/bash

CERT="gen/certificate.pem"
KEY="gen/private.pem"

echo "Checking private.pem ..."
openssl rsa -in $KEY -check -noout || exit 1

echo "Checking certificate.pem ..."
openssl x509 -in $CERT -text -noout || exit 1

echo "Comparing moduli ..."
MOD_CERT=$(openssl x509 -noout -modulus -in $CERT | openssl md5)
MOD_KEY=$(openssl rsa -noout -modulus -in $KEY | openssl md5)

if [ "$MOD_CERT" = "$MOD_KEY" ]; then
    echo "Certificate and key match."
else
    echo "Modulus mismatch!"
    exit 2
fi

echo
read -p "Press ENTER to exit..."
