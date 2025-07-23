# DNS & SSH Known Hosts Automation for Multiple Servers with Terraform

## 📡 DNS Configuration

The DNS setup uses the [HashiCorp DNS Provider](https://registry.terraform.io/providers/hashicorp/dns/latest) 
to manage `A` records for each server.

### Example: `A` Records Generation

```hcl
resource "dns_a_record_set" "canonical" {
  for_each = local.server_ips

  zone      = "${var.dnsZone}."
  name      = each.key
  addresses = [each.value]
  ttl       = 10
}
```

Terraform will create `A` records such as:

```text
work-1.g3.sdi.hdm-stuttgart.cloud. → 10.0.0.11
work-2.g3.sdi.hdm-stuttgart.cloud. → 10.0.0.12
...
```

## SSH Known Hosts Module

This module generates:

- A `known_hosts` file for the server
- Aggregated `known_hosts` file
- SSH and SCP scripts that use those known hosts
