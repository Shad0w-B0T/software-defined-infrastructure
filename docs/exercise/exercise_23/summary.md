# Summary

This documentation guided you through deploying and testing a **wildcard TLS certificate** using Nginx and Let's Encrypt.
After generating the certificate with Terraform and the ACME DNS challenge, 
you installed and configured Nginx to serve HTTPS traffic using your custom certificate.

You tested access to multiple subdomains (`www` and `mail`) over HTTPS and learned how to validate the 
certificate chain, debug Nginx configurations, and distinguish between staging and production certificates.

Using Let's Encrypt's **staging environment** helped you avoid rate limits during the setup phase. 
Once your configuration was confirmed, switching to the **production** ACME server ensured browser-trusted 
certificate issuance.

## Key Outcomes

- You installed `certificate.pem` and `private.pem` into appropriate system paths.
- Nginx was correctly configured to support HTTPS on port `443`.
- You verified your setup through browser inspection and Nginx tools (`nginx -t`, `systemctl`).
- You understood the certificate chain (`Your cert → R10 → ISRG Root X1`).
- The wildcard certificate was successfully tested against `g3.sdi.hdm-stuttgart.cloud`, `www`, and `mail`.

## Further Resources & References

- [Let's Encrypt DNS-01 Challenge](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge)
- [Terraform ACME Provider](https://registry.terraform.io/providers/vancluever/acme/latest/docs)
- [Nginx SSL Configuration Guide](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [OpenSSL – Test a Certificate](https://www.openssl.org/docs/man1.1.1/man1/openssl-s_client.html)
- [Let's Encrypt Staging vs Production](https://letsencrypt.org/docs/staging-environment/)
