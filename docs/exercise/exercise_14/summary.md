# Summary

In this module, we addressed a common challenge encountered when repeatedly creating cloud infrastructure with Terraform: 
SSH host key verification errors caused by reused IP addresses and changing host fingerprints. 
To solve this, we introduced a reproducible and automated approach to handle known SSH host keys.

By pre-generating a `known_hosts` file and using Terraform to inject SSH host keys via cloud-init, 
we ensure that every newly provisioned server is immediately accessible without manual confirmation prompts.
The custom SSH and SCP wrapper scripts (`bin/ssh` and `bin/scp`) use the generated `known_hosts` file to guarantee 
a smooth and secure connection.

This approach improves:
- **Automation**: No need for user interaction on first SSH connect
- **Security**: Known host keys are explicitly verified
- **Reproducibility**: Environment can be reliably recreated from scratch
- **Portability**: Scripts work across systems without relying on local `~/.ssh/known_hosts`

## Further Resources & References

- [Terraform - Official Documentation](https://developer.hashicorp.com/terraform/docs)
- [Hetzner Cloud API Documentation](https://docs.hetzner.cloud/)
- [OpenSSH Known Hosts Guide](https://man.openbsd.org/sshd.8#SSH_KNOWN_HOSTS)
- [Understanding Cloud-Init](https://cloudinit.readthedocs.io/)
- [How SSH Host Key Verification Works](https://www.ssh.com/academy/ssh/host-key)

> Tip: Always version-control your templates and generated files (excluding secrets) to improve transparency and collaboration.
