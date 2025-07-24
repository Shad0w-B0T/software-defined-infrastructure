# Summary

- Create a server and install NGINX following security best practices.
- Configure the firewall to allow only ICMP and SSH (port 22), blocking HTTP access.
- Use SSH local port forwarding (`ssh -L 2000:localhost:80`) to securely forward remote port 80 to local port 2000.
- Access the remote web server via `http://localhost:2000` on your local machine despite firewall restrictions.
- Understand how SSH tunnels enable secure access to services blocked by firewalls.

## Further Resources & References

- [SSH Local Port Forwarding (SSH.com)](https://www.ssh.com/academy/ssh/tunneling-forwarding)  
  Comprehensive guide on SSH tunneling and port forwarding techniques.

- [NGINX Official Documentation](https://nginx.org/en/docs/)  
  Documentation for installing, configuring, and managing NGINX web server.

- [Hetzner Cloud Firewall Documentation](https://docs.hetzner.com/cloud/firewalls/overview)  
  Overview and setup instructions for firewalls in Hetzner Cloud.

- [SSH Manual Page (man ssh)](https://man.openbsd.org/ssh)  
  Detailed reference for the SSH command and its options including port forwarding.