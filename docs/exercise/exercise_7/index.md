# SSH Port Forwarding

In this exercise, we will simulate a common real-world scenario.
A remote server can only be accessed via SSH (port 22); all other incoming traffic, such as HTTP (port 80), is blocked by the firewall.
However, we still need to access the web server running on that host via a browser. To do this, we will 
forward remote port 80 to local port 2000 using SSH.

## 1. Prepare the Server

- Create a server as shown in:
[Improve your server's security](/exercise/exercise_3/#improve-your-server-s-security)
- Install NGINX:
[Install NGINX](exercise/exercise_3/nginx.html#_1-install-and-run-a-web-server)
- Configure the firewall to allow only ICMP and port 22 (SSH). → This means NGINX will no longer be accessible externally.

## 2. Set Up Local Port Forwarding

To access NGINX despite the firewall, use SSH port forwarding:

```shell
sh -L 2000:localhost:80 root@46.62.153.100
Linux debian-2gb-hel1-1 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Jul  8 21:10:47 2025 from 217.247.108.198
root@debian-2gb-hel1-1:~# 
```

This command:
 
- Opens an SSH connection to the remote host.
- Forwards local port **2000** to port **80** on the remote host via the SSH tunnel.

### 3. Access NGINX via Localhost

Now, you can access the remote NGINX server by visiting: http://localhost:2000
Although the firewall blocks direct HTTP access, the traffic is securely forwarded through the SSH tunnel.

<ImageWithCaption src="/images/exercise_7/port.png" alt="SSH Port Forwarding: Port 80 → 2000" :caption="'Remote port 80 is forwarded through SSH to local port 2000'" :number="1" />

