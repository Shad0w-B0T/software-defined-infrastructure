# Step-by-step Instructions

- Create a server as shown in:
  [Improve your server's security](/exercise/exercise_3/introduction.html#improve-your-server-s-security)
- Install NGINX:
  [Install NGINX](/exercise/exercise_3/step-by-step/nginx.html#install-and-run-a-web-server)
- Configure the firewall to allow only ICMP and port 22 (SSH). → This means NGINX will no longer be accessible externally.

## Set up Local Port Forwarding

To access NGINX despite the firewall, use SSH port forwarding:

```bash
ssh -L 2000:localhost:80 root@46.62.153.100
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

### Access NGINX via localhost

Now, you can access the remote NGINX server by visiting:

> `http://localhost:2000`

Although the firewall blocks direct HTTP access, the traffic is securely forwarded through the SSH tunnel.

<ImageWithCaption
src="/images/exercise_7/port.png"
alt="SSH Port Forwarding: Port 80 → 2000"
:caption="'Remote port 80 is forwarded through SSH to local port 2000'"
:number="1"
/>
