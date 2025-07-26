# Creating a Host with DNS and SSH Access

In this guide, you will provision a virtual machine (VM) and automatically configure both its DNS 
records and SSH access setup.  
The goal is to associate the server's generated IPv4 address with a DNS name like 
`workhorse.gxy.sdi.hdm-stuttgart.cloud`, and to generate `known_hosts`, `ssh` and `scp`
scripts that use this DNS name — not the raw IP.

This approach improves maintainability and readability while avoiding common SSH host key mismatch issues 
when servers are re-provisioned with the same name.

By the end, you will have:

- A provisioned cloud VM with a public IP
- Corresponding `A` and `CNAME` records in your DNS zone
- A `known_hosts` file containing the server’s DNS name and SSH public key
- Wrapper scripts for `ssh` and `scp` using the DNS name instead of the IP address

## Prerequisites

- A subdomain zone like `gxy.sdi.hdm-stuttgart.cloud` delegated to your group
- Access to the authoritative DNS server: `ns1.hdm-stuttgart.cloud`
- A valid TSIG HMAC key configured in your environment:

```bash
export HMAC="hmac-sha512:<key-name>:<base64-secret>"
```

- Terraform installed and working on your machine 
- ``dig``, ``ssh`` and ``scp`` available in your environment 
- A working Terraform SSH wrapper module (e.g., for generating ``gen/known_hosts``, ``bin/ssh``, ``bin/scp``)
- A basic understanding of Terraform resource dependencies and template rendering

