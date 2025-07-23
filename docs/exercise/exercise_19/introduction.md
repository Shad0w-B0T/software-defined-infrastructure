# Terraform DNS Provider

This guide demonstrates how to use a TSIG (Transaction Signature) key to securely update DNS records using Terraform
with the `hashicorp/dns` provider.
It includes an example of setting up DNS A and CNAME records in a subdomain zone with authentication via a TSIG key.

## TSIG Key Format

The TSIG key is used to authenticate DNS updates and transfers securely. It must be provided in the following format:

```bash
hmac-sha512:<key-name>:<base64-secret>
```

- `<key-name>`: The name of your TSIG key, usually ending with a dot (`.`).
- `<base64-secret>`: The base64-encoded secret associated with your key.
- The algorithm used here is `hmac-sha512`.

## Example Variables Configuration

Define your variables as follows, typically in a `.tfvars` or Terraform variables file:

```hcl
dnsZone    = "g3.sdi.hdm-stuttgart.cloud"
serverIp   = "1.2.3.4"
serverName = "workhorse"
serverAliases = ["www", "mail"]
dns_key_name = "g3.key."  # Note the trailing dot is important
dns_secret = "41Pp..."

```

## Terraform DNS Resources Overview

Using the above variables, Terraform will create:

- An **A record** for the canonical server: 

  `workhorse.g3.sdi.hdm-stuttgart.cloud → 1.2.3.4`

- **CNAME aliases** for the server aliases:

  `www.g3.sdi.hdm-stuttgart.cloud → workhorse.g3.sdi.hdm-stuttgart.cloud`

  `mail.g3.sdi.hdm-stuttgart.cloud → workhorse.g3.sdi.hdm-stuttgart.cloud`

- An optional **A record** for the root of the zone (`@`) pointing to the server IP

## Verifying DNS Records with `dig`

After applying your Terraform configuration,
verify the records directly on your authoritative DNS server with the following commands:

### Full Zone Transfer (AXFR) with TSIG Authentication

```bash
dig +noall +answer @ns1.hdm-stuttgart.cloud -y "hmac-sha512:${dns_key_name}:${dns_secret}" -t AXFR g3.sdi.hdm-stuttgart.cloud
```

Expected output example:

```text
g3.sdi.hdm-stuttgart.cloud. 600 IN SOA ns1.hdm-stuttgart.cloud. goik@hdm-stuttgart.de. 36 604800 86400 2419200 604800
g3.sdi.hdm-stuttgart.cloud. 600 IN NS ns1.hdm-stuttgart.cloud.
hello.g3.sdi.hdm-stuttgart.cloud. 10 IN A 157.180.78.55
mail.g3.sdi.hdm-stuttgart.cloud. 10 IN CNAME workhorse.g3.sdi.hdm-stuttgart.cloud.
workhorse.g3.sdi.hdm-stuttgart.cloud. 10 IN A 1.2.3.4
www.g3.sdi.hdm-stuttgart.cloud. 10 IN CNAME workhorse.g3.sdi.hdm-stuttgart.cloud.
g3.sdi.hdm-stuttgart.cloud. 600 IN SOA ns1.hdm-stuttgart.cloud. goik@hdm-stuttgart.de. 36 604800 86400 2419200 604800
```

### Query Individual Records

Check the IP address and canonical names:

```bash
dig +short @ns1.hdm-stuttgart.cloud workhorse.g3.sdi.hdm-stuttgart.cloud
# Output: 1.2.3.4

dig +short @ns1.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud
# Output: workhorse.g3.sdi.hdm-stuttgart.cloud.

dig +short @ns1.hdm-stuttgart.cloud mail.g3.sdi.hdm-stuttgart.cloud
# Output: workhorse.g3.sdi.hdm-stuttgart.cloud.
```

## DNS Records Summary

| Record                                 | Type  | Target                  |
|----------------------------------------|-------|-------------------------|
| `workhorse.g3.sdi.hdm-stuttgart.cloud` | A     | 1.2.3.4                 |
| `www.g3.sdi.hdm-stuttgart.cloud`       | CNAME | workhorse.g3.sdi.hdm... |
| `mail.g3.sdi.hdm-stuttgart.cloud`      | CNAME | workhorse.g3.sdi.hdm... |

## Additional Notes

- Make sure the TSIG key you use (`dns_key_name` and `dns_secret`) matches exactly the key configured on the authoritative DNS server (`ns1.hdm-stuttgart.cloud`).
- The trailing dot (`.`) in zone names and key names is important to ensure they are fully qualified.
- You need appropriate permissions on the DNS server to perform dynamic updates; otherwise, you might get refused errors.
- Use the `dig` commands above to verify your DNS records immediately after deployment.
