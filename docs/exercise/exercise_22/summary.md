# Summary

This guide walked you through the automated process of generating a wildcard TLS certificate using Let's Encrypt and Terraform,
specifically leveraging the ACME protocol and RFC2136 DNS challenge. 
By using Terraform resources like `tls_private_key`, `acme_registration`, and `acme_certificate`, 
you created a reusable, secure, and repeatable setup for certificate issuance.

Key takeaways:
- You created a DNS-validated wildcard certificate for `*.g3.sdi.hdm-stuttgart.cloud`.
- You safely stored the private key and certificate locally under `gen/`.
- You used the Let's Encrypt **staging** environment to prevent hitting rate limits.
- You prepared your configuration for easy migration to production by simply changing the ACME endpoint.

This method is ideal for teams or automated CI/CD workflows, ensuring TLS certificates are version-controlled, reproducible, and securely provisioned.

## Further Resources & References

- [Terraform ACME Provider Documentation](https://registry.terraform.io/providers/vancluever/acme/latest/docs)
- [Terraform TLS Provider](https://registry.terraform.io/providers/hashicorp/tls/latest)
- [Let's Encrypt – DNS-01 Challenge Documentation](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge)
- [ACME Protocol Specification (RFC 8555)](https://datatracker.ietf.org/doc/html/rfc8555)
- [Terraform Official Documentation](https://www.terraform.io/docs)
