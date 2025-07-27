# Summary

This guide describes how to use Terraform to provision a configurable number of servers with unique DNS records 
and individualized SSH configurations.

Each server gets:
- A dedicated A record (e.g., `work-1.g3.sdi.hdm-stuttgart.cloud`)
- A uniquely generated SSH key pair
- A subdirectory (`work-1/`, `work-2/`, etc.) containing:
  - A `known_hosts` file for secure SSH verification
  - A `wrapper SSH` script for simplified access

By configuring the `serverCount`, `serverBaseName`, and `dnsZone`, 
the deployment becomes fully scalable and automated. 
The DNS records are managed using the 
[HashiCorp DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest),
and SSH key validation is handled through custom modules that ensure secure access via DNS.

This setup is ideal for educational environments or distributed systems that require isolated access
to multiple virtual machines.

## Further Resources & References

- [Terraform DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest)
- [Terraform - for_each Meta-Argument](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each)
- [Using Cloud-Init with Terraform](https://cloudinit.readthedocs.io/en/latest/)
- [Generating SSH Keys with Terraform](https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key)
