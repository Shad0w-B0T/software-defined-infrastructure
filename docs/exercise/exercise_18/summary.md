# Summary

This guide walked you through enhancing your Hetzner-hosted web server with DNS configuration and HTTPS via Let's Encrypt.
You learned how to configure Nginx, verify domain propagation, and obtain TLS certificates in both staging and production
environments to secure your site.

## Staging Summary

Set up a basic Nginx configuration listening on port 80.
Issued a test TLS certificate using Let's Encrypt's staging environment with certbot --staging.
Verified that HTTPS works (with a browser warning) using the staging CA.
Confirmed the certificate issuer to avoid hitting production rate limits during testing.

## Staging Summary

Cleaned up and reused the Nginx configuration.
Requested a valid, trusted TLS certificate using the production Let's Encrypt CA.
Verified full HTTPS support on both g3.sdi.hdm-stuttgart.cloud and www.g3.sdi.hdm-stuttgart.cloud.
Ensured firewall access on port 443 and confirmed the certificate issuer using openssl.


## Further Resources & References

- [Certbot Docs](https://certbot.eff.org/)
- [Let's Encrypt Staging vs. Production](https://letsencrypt.org/docs/staging-environment/) 
- [DigitalOcean Nginx + Let’s Encrypt Guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-11)
- [Hetzner Cloud Documentation](https://docs.hetzner.com/)
- ``dig``, ``nslookup``, and ``openssl`` for diagnostics and verification
