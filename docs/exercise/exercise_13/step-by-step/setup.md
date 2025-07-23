# Deploying a Secure Nginx Web Server with Fail2Ban on Hetzner Cloud using Terraform

This guide describes how to automatically provision a Hetzner Cloud server using Terraform, install an Nginx web server,
and secure it with Fail2Ban using a cloud-init shell script.

**Why Is Additional Security Like Fail2Ban Necessary?**

As soon as a server with a public IP address comes online — especially with open standard ports like SSH (port 22) or HTTP 
(port 80) — it is typically discovered within minutes by automated bots and scanners from around the world. These actors attempt to gain access through various techniques, most commonly:

- **Brute-force attacks** on SSH, often using common usernames like root, admin, or guessing weak passwords. 
[Fail2Ban – Why Brute-Force Attacks Are Common](https://www.fail2ban.org/wiki/index.php/Main_Page)
- Botnets, composed of compromised devices, that sweep IP address ranges in search of open and insecure servers.

Even if your server is freshly deployed and not publicly advertised, it's common to see failed login attempts in system 
logs **within the first few minutes**. This is why deploying protections like **Fail2Ban** is essential — it helps detect and automatically block suspicious activity early before a breach can occur.

## Project Structure

```shell
project-root/
├── main.tf                        # Main infrastructure definitions
├── variables.tf                   # Variable definitions (token, ssh key, etc.)
├── outputs.tf                     # Outputs (e.g., IP address, datacenter)
├── tpl/
│   └── userData.yml     # Cloud-init script for Nginx + Fail2Ban
└── secrets.auto.tfvars.template  # API token template (DO NOT COMMIT)
```

## Prepare Your Hetzner API Token

The prerequisites for this setup are identical to those used for creating a basic server. If you've already completed the earlier setup,
you can reuse the same token and SSH configuration.

Refer to:

- [Prerequisites](/exercise/exercise_11/setup.html#%F0%9F%9B%A0%EF%B8%8F-2-prerequisites)
- [Hetzner api token](/exercise/exercise_11/setup.html#%F0%9F%94%90-3-secure-your-hetzner-api-token)

## Create Cloud-Init `userData.yml`

bei der in der tpl befindenten datei handelt es sich um ein template das gebaut wird und dann die richtige file
im /gen ordern ablegt.

wichtig ist hierbei zu sagen, das python3 benötigt wird. beben python3 wird auch ebenfalls python3-systemd,
benötigt. was leider nicht standardmäßig installirt wird.

es es nicht vorhanden fail der start von fail2ban mit dem error code 255.

## Initialize and Deploy

The deployment process is identical to the earlier example. Follow the same instructions to initialize and apply the
Terraform configuration.

Reference: [Initialize and Deploy](/exercise/exercise_11/setup.html#%F0%9F%9A%80-4-initialize-and-deploy)

Example output:

```shell
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.

Outputs:

datacenter = "nbg1-dc3"
ip_addr = "91.99.69.219"
```

## Access Nginx in Your Browser

Once provisioning is complete, open the server’s public IP in a browser to see the default Nginx welcome page:

> 91.99.69.219

<ImageWithCaption 
    src="/images/exercise_13/nginx_webserver.png" 
    alt="Nginx welcome page" 
    :caption="'Nginx welcome page'" 
    :number="1"
/>

## Verify Services via SSH (Optional)

To verify that the services are running correctly, you can SSH into the server.

### Root Login Is Disabled

For security reasons, the root user login has been disabled. Attempting to connect as root will result in the following message:

```bash
C:\Users\Daniel>ssh root@91.99.69.219
Please login as the user "NONE" rather than the user "root".

Connection to 91.99.69.219 closed.
```

### Use the devops User Instead

You can connect using the `devops` user and the configured SSH key:

```bash
C:\Users\Daniel>ssh devops@91.99.69.219
Linux nginx-server 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sat Jul 12 15:20:16 2025 from 91.8.102.39
devops@nginx-server:~$
```

### Check Nginx Status

Run the following command:

```shell
systemctl status nginx
```

**Expected output:**

```shell
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Sat 2025-07-12 15:20:22 UTC; ...
```

### Check Fail2Ban Status

To verify that Fail2Ban is running and protecting the server:

```shell
systemctl status fail2ban
```

**Expected output:**

```shell
● fail2ban.service - Fail2Ban Service
     Loaded: loaded (/lib/systemd/system/fail2ban.service; enabled; preset: enabled)
     Active: active (running) since Sat 2025-07-12 15:20:31 UTC; ...
```