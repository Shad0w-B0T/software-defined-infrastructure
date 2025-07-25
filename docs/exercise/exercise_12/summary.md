# Summary

This project demonstrates how to automatically provision a Hetzner Cloud server with Nginx installed and running,
using Terraform and a cloud-init script. The process eliminates manual setup by embedding the installation logic
directly into Terraform's `user_data` block. Key parts of the setup include:

- Automated provisioning of a Debian-based Hetzner VM via Terraform
- Shell script (`nginx-init.sh`) that installs, starts, and enables Nginx during server creation
- SSH key-based access and optional verification of service status
- Declarative infrastructure that supports reproducibility and automation
- Firewall and token configuration managed securely and modularly

Once applied, the infrastructure is ready to serve web content immediately, ensuring a streamlined workflow 
for deploying simple web servers or serving as a base for further automation.

## Further Resources & References

- [Terraform Installation Guide](https://developer.hashicorp.com/terraform/install)
- [Hetzner Cloud Documentation](https://docs.hetzner.cloud/)
- [Nginx Documentation](https://nginx.org/)
- [Cloud-init Documentation](https://cloudinit.readthedocs.io/en/latest/)
- [Systemd Overview (Arch Wiki)](https://wiki.archlinux.org/title/Systemd)
- [Secure Server Deployment Steps](../exercise_11/step-by-step/secure_server.md#initialize-and-deploy-instructions)
