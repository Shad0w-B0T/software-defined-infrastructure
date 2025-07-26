# Summary

In this guide, you automated the provisioning and configuration of a server with:

- A DNS `A` record for the canonical server name
- Multiple `CNAME` alias records for user-friendly access (e.g., `www`, `mail`)
- A generated `known_hosts` file based on the server’s SSH public key
- Wrapper scripts (`ssh` and `scp`) using the DNS name instead of the IP for more stable and secure access


## Key Benefits

- **Security**: Avoids SSH host key mismatches by tracking known hosts explicitly
- **DNS Integration**: Simplifies access through clean, consistent domain names
- **Infrastructure as Code**: Repeatable deployments with validation and modularity

## Further Resources & References

- [Terraform DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest)
- [Terraform Variable Validation](https://developer.hashicorp.com/terraform/language/expressions/validation)
- [TSIG Authentication (RFC 2845)](https://datatracker.ietf.org/doc/html/rfc2845)
- [SSH Key Management Best Practices](https://smallstep.com/blog/ssh-certificates/)
- **Common Tools Used**:
    - [`dig`](https://linux.die.net/man/1/dig) — for querying DNS records
    - `ssh`, `scp` — secure access and file transfer

