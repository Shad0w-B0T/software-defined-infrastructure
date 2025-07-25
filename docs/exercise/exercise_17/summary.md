# Summary

The `SshKnownHosts` module provides a declarative and reusable way to handle SSH host key 
verification in Terraform-managed environments. 
It replaces manual ``known_hosts`` management and ad hoc scripting with a reliable mechanism that works 
seamlessly with Hetzner Cloud servers and Terraform workflows.

By generating a dedicated `known_hosts` file and creating wrapper scripts for `ssh` and `scp`, the module ensures:

- Secure, non-interactive SSH/SCP access
- Compatibility with ephemeral and frequently recreated cloud instances
- Clean separation of infrastructure provisioning and operational access
- Simplified reuse across multiple projects

Using this module improves automation, enhances developer experience, and helps enforce best practices in DevOps setups.

## Further Resources & References

- [Hetzner Cloud Terraform Provider](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs)
- [Terraform ``tls_private_key`` Resource](https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key)
- [Terraform Modules Documentation](https://developer.hashicorp.com/terraform/language/modules)
- [OpenSSH ``known_hosts`` Format](https://man.openbsd.org/ssh.1#KNOWN_HOSTS_FILE)
- [Cloud-init Project](https://cloud-init.io/)
