# Hardening a Hetzner Server Using Cloud-Init

This guide describes how to automatically provision a Hetzner Cloud server using Terraform, install an Nginx web server,
and secure it with Fail2Ban using a cloud-init shell script.

**Why Is Additional Security Like Fail2Ban Necessary?**

As soon as a server with a public IP address comes online — especially with open standard ports like SSH (port `22`) or HTTP
(port `80`) — it is typically discovered within minutes by automated bots and scanners from around the world. These actors attempt to gain access through various techniques, most commonly:

- **Brute-force attacks** on SSH, often using common usernames like root, admin, or guessing weak passwords.
  [Fail2Ban – Why Brute-Force Attacks Are Common](https://www.fail2ban.org/wiki/index.php/Main_Page)
- Botnets, composed of compromised devices, that sweep IP address ranges in search of open and insecure servers.

Even if your server is freshly deployed and not publicly advertised, it's common to see failed login attempts in system
logs **within the first few minutes**. This is why deploying protections like **Fail2Ban** is essential — it helps detect and automatically block suspicious activity early before a breach can occur.


## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- A valid **Hetzner Cloud API token** ([How to create one](https://docs.hetzner.cloud/#overview-getting-started))
- A local **SSH keypair** for secure login ([Generate with ssh-keygen](https://www.ssh.com/academy/ssh/keygen))
- Familiarity with the basics of [creating servers in Hetzner Cloud](../exercise_1/step-by-step/create-server.md)
- Understanding of [firewall configuration](../exercise_1/step-by-step/firewall.md)
- Basic Linux administration knowledge:
    - Editing `/etc/ssh/sshd_config`
    - Using `systemctl`, `journalctl`, `sudo`, and `apt`
    - Understanding Cloud-init ([Cloud-init documentation](https://cloudinit.readthedocs.io/en/latest/index.html))
