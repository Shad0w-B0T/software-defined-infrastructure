# Deploying a Nginx Web Server with Terraform on Hetzner Cloud

## Project Structure

```shell
project-root/
├── main.tf                      # Main infrastructure definitions
├── variables.tf                 # Variable definitions (e.g., token)
├── outputs.tf                   # Terraform outputs (IP, datacenter)
├── nginx-init.sh                # Bash script for Nginx installation
└── secrets.auto.tfvars.template # Token template (DO NOT COMMIT)
```

## Prepare Your Hetzner API Token

The prerequisites for this setup are identical to those used for creating a basic server. If you've already completed the earlier setup,
you can reuse the same token and SSH configuration.

Refer to:
- [Prerequisites](../exercise_11/introduction.md#prerequisites)
- [Hetzner api token](../exercise_11/step-by-step/secure_server.md#secure-your-variables)

## Create Cloud Init Script (`nginx-init.sh`)

The Nginx web server is installed automatically via a shell script that runs when the server is created. This script is 
injected using the `user_data` parameter of the Hetzner Cloud server resource:

```hcl
resource "hcloud_server" "nginxServer" {
  name         = "nginx-server"
  image        = "debian-12"
  server_type  = "cx22"
  ssh_keys     = [hcloud_ssh_key.loginUser.id]
  firewall_ids = [hcloud_firewall.fw_nginx.id]
  user_data    = file("${path.module}/nginx-init.sh")
}
```

## Initialize and Deploy

The deployment process is identical to the earlier example. Follow the same instructions to initialize and apply the 
Terraform configuration.

Reference: [Initialize and Deploy](../exercise_11/step-by-step/secure_server.md#deploy-instructions)

**Example output:**

```shell
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

Outputs:

datacenter = "nbg1-dc3"
ip_addr = "91.99.69.219"
```

## Access the Nginx Server in a Browser

Once provisioning is complete, open the public IP address in your browser to verify that Nginx is 
running and serving the default page.

> http://91.99.69.219

<ImageWithCaption 
    src="/images/exercise_12/nginx_webserver.png" 
    alt="Nginx Welcome Page" 
    :caption="'Hello World index.html served by Nginx'"
    :number="1" 
/>

## Verify Nginx Service Status (Optional via SSH)

To manually verify that Nginx is active on the server, connect via SSH:

```shell
ssh root@91.99.69.219
```

Then run:

```shell
systemctl status nginx
```

**Expected Output:**

```shell
● nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled)
Active: active (running)
...
```

This confirms that Nginx is installed, running, and enabled to start automatically on reboot.
