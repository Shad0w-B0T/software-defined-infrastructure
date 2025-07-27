#  Understanding Firewalls Through a Web Server Setup

Setting up a simple web server such as NGINX provides a practical, hands-on approach to learning about firewalls. 
Since web servers require specific ports (e.g. `80` for HTTP) to be open for external access, this setup helps to 
visualise how firewall rules control traffic. Changes (e.g. opening or blocking ports) can be tested immediately and 
their effect on accessibility from both inside and outside the server can be understood. This method is ideal for 
beginners looking to grasp basic network security concepts.

## Install and Run a Web Server

Install NGINX, a lightweight and fast web server:

```bash
apt install nginx
```

**Example output:**

```bash
root@debian-2gb-hel1-1:~# apt install nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common
Suggested packages:
  fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  nginx nginx-common
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
...
Upgrading binary: nginx.
Processing triggers for man-db (2.11.2-2) ...
```

## Test NGINX Locally From the Server

Check if task is running on system:

```bash
systemctl status nginx
```

**Example output:**

```bash
root@debian-2gb-hel1-1:~# systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Tue 2025-07-08 21:10:57 UTC; 1min 29s ago
       Docs: man:nginx(8)
...
```

Even without browser access, you can test the HTTP server locally:

```bash
wget -O - http://46.62.153.100
```

**Example output:**

```bash
root@debian-2gb-hel1-1:~# wget -O - http://46.62.153.100
--2025-07-08 21:13:18--  http://46.62.153.100/
Connecting to 46.62.153.100:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 615 [text/html]
Saving to: ‘STDOUT’

-                              0%[                                              ]       0  --.-KB/s               <!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
-                            100%[=============================================>]     615  --.-KB/s    in 0s      

2025-07-08 21:13:18 (101 MB/s) - written to stdout [615/615]
```

This confirms that NGINX is running and responding on port `80`.

## External Browser Access Fails — Why?

Try accessing 
> http://46.62.153.100
 
Won’t load in the browser

**Why?**

The firewall still blocks port `80`, even though the server itself is working.

## Allow Port 80 in Firewall

Add another inbound firewall rule:
- Protocol: **TCP**
- Port: **80**

Now refresh the browser — it should work!

<ImageWithCaption src="/images/exercise_3/firewall_full.png" alt="Full firewall with SSH + HTTP" :caption="'Firewall after adding SSH + HTTP access'" :number="2" />