# Summary

In this exercise, you created and verified DNS records for a subdomain of `*.sdi.hdm-stuttgart.cloud` using Terraform 
and the `dns` provider with TSIG authentication.

You learned how to:

- Define variables for base domain, server IP, canonical name, and aliases.
- Securely configure Terraform to create A and CNAME records.
- Use `dig` to verify DNS records and perform zone transfers.
- Apply custom validation to prevent configuration errors like duplicate or conflicting aliases.

## Further Resources & References

- [Terraform DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest/docs)
- [RFC 2845 – Secret Key Transaction Authentication for DNS (TSIG)](https://tools.ietf.org/html/rfc2845)
- [`dig` Command Tutorial](https://linuxize.com/post/how-to-use-dig-command-to-query-dns-in-linux/)
- [Hetzner Cloud Documentation](https://docs.hetzner.com/)
- [Terraform Input Variable Validation](https://developer.hashicorp.com/terraform/plugin/framework/validation)
