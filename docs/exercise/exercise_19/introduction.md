# Creating DNS Records with Terraform

In this guide, you will automate the creation of DNS records for a custom domain under `*.sdi.hdm-stuttgart.cloud` 
using Terraform.
The goal is to define a flexible configuration that can:

- Assign a static IP to your server’s canonical DNS name (e.g., `workhorse.gxy.sdi.hdm-stuttgart.cloud`)
- Register the base domain (`gxy.sdi.hdm-stuttgart.cloud`) to point to the same IP
- Create multiple alias records (e.g., `www`, `mail`) that reference the canonical server name

By defining proper input variables, the setup becomes reusable and modular — 
enabling easy updates or adaptation for different environments.

You will also implement **custom validation rules** to prevent misconfigurations like duplicate aliases or alias-name 
conflicts with the server’s main name.


## Prerequisites

- A domain namespace like `gxy.sdi.hdm-stuttgart.cloud` delegated to your group
- Access to the authoritative name server: `ns1.hdm-stuttgart.cloud`
- A valid HMAC key for DNS updates exported in your environment:

```bash
export HMAC="hmac-sha512:..."
```
- Terraform CLI installed and working 
- Basic knowledge of Terraform resources and variable usage 
- Understanding of ``dig``, ``nsupdate`` and ``DNS record types (A, CNAME)``
- IP address for your server (e.g., 1.2.3.4, can be a placeholder)

### Optional but useful:

- ``dig`` installed locally to verify DNS propagation:

```bash
dig +noall +answer @ns1.hdm-stuttgart.cloud -y "$HMAC" -t AXFR gxy.sdi.hdm-stuttgart.cloud
```
