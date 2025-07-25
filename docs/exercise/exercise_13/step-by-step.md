# Deploying a Secure Nginx Web Server with Fail2Ban on Hetzner Cloud using Terraform

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

- [Prerequisites](../exercise_11/introduction.md#prerequisites)
- [Hetzner api token](../exercise_11/step-by-step/secure_server.md#secure-your-variables)

## Create Cloud-Init `userData.yml`

The file located in the `tpl/` directory is a **template** used to generate the final Cloud-init configuration.
When the Terraform setup is applied, this template is processed and rendered into a complete `userData.yml` file, 
which is stored in the `gen/` directory.

This approach allows for modular, reusable, and parameterized configuration — keeping secrets and environment-specific 
values out of versioned source files.

::: tip **Important:**  
The server must have **Python 3** installed, as well as the `python3-systemd` package.
:::

By default, many minimal Linux images (such as Debian 12) **do not include** `python3-systemd`. 
If it is missing, `fail2ban` will **fail to start** with **exit code 255**, because it cannot log properly via systemd.

Make sure your `userData.yml` installs both packages during provisioning:

```bash
apt install -y python3 python3-systemd
```

## Initialize and Deploy

The deployment process is identical to the earlier example. Follow the same instructions to initialize and apply the
Terraform configuration.

Reference: [Initialize and Deploy](../exercise_11/step-by-step/secure_server.md#initialize-and-deploy-instructions)

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