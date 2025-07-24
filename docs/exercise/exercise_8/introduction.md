# X11 Forwarding: GUI Applications via SSH

This guide explains how to securely access remote graphical applications (such as Firefox) via SSH using X11 forwarding,
even when only port 22 (SSH) is open.

## Prepare the Remote Server

- Create a server as shown in:
  [Improve your server's security](../exercise_3/introduction.md#improve-your-servers-security)
- Install NGINX:
  [Install NGINX](../exercise_3/step-by-step/nginx.md#install-and-run-a-web-server)
- Configure the firewall to allow only ICMP and port 22 (SSH). → This means NGINX will no longer be accessible
  externally.

## Install the required X11 Package on Remote Host

[Update](../exercise_3/introduction.md#update--reboot-for-security) and install the xauth package — required for X11
forwarding:

```shell
root@debian-2gb-hel1-1:~# apt install xauth -y
```

## Reconnect with X11 Forwarding

Use the -Y option with SSH from your local machine:

```shell
ssh -Y root@46.62.153.100                                    
Linux debian-2gb-hel1-1 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Jul  8 21:38:23 2025 from 217.247.108.198
/usr/bin/xauth:  file /root/.Xauthority does not exist
root@debian-2gb-hel1-1:~# 
```

You may see a harmless warning if .Xauthority does not exist yet:

```shell
/usr/bin/xauth:  file /root/.Xauthority does not exist
```

That’s expected and automatically handled.

::: tip 💡 Tip
Make sure you are running an X11 server locally.
:::

## Install Firefox on Remote Host

Still inside the SSH session:

```shell
apt install firefox-esr -y
```

## Launch Firefox (Runs Remotely, Displays Locally)

Run the browser — it will open on the server but display on your local desktop via the X11 tunnel:

```shell
root@debian-2gb-hel1-1:~# firefox &
[GFX1-]: glxtest: libpci missing
[GFX1-]: glxtest: libEGL missing
[GFX1-]: glxtest: libGL.so.1 missing
[GFX1-]: No GPUs detected via PCI
```

These can usually be ignored — Firefox will still run. If it takes a while to launch, that's normal. X11 forwarding can
be slow, especially over the internet.

<ImageWithCaption 
  src="/images/exercise_8/firefoxx11.png" 
  alt="Firefox launched remotely via X11 forwarding" 
  :caption="'Firefox running over SSH X11 forwarding'" 
  :number="1" 
/>

## Prerequisites

- test
- test