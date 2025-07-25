# Summary

This guide demonstrated how to securely deploy and configure a Hetzner Cloud server using Terraform, 
with a focus on automating the installation of Nginx and securing SSH access using Fail2Ban — 
all via a Cloud-init `userData` configuration.

You learned how to:
- Structure a Terraform project for modular infrastructure provisioning
- Securely pass API tokens and SSH keys using `.tfvars` and templates
- Configure a Cloud-init script to install packages, harden SSH, and enable services on boot
- Verify the status of critical services such as `nginx` and `fail2ban`
- Prevent brute-force attacks by monitoring login attempts and enforcing login restrictions

## Further Resources & References

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Hetzner Cloud API Documentation](https://docs.hetzner.cloud/)
- [Cloud-init Official Docs](https://cloudinit.readthedocs.io/en/latest/)
- [Fail2Ban Wiki & Configuration](https://www.fail2ban.org/wiki/index.php/Main_Page)
- [Debian SSH Hardening Guide](https://wiki.debian.org/SSH)

