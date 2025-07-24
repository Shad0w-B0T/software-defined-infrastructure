# Create a Secure Server with Minimal Access

[Firewall Section](../../exercise_1/step-by-step/firewall.md#create-a-new-firewall)

<ImageWithCaption
src="/images/exercise_3/firewall_icmp_only.png"
alt="Firewall rule creation"
:caption="'Firewall rule creation'"
:number="1"
/>

## Verify Ping (ICMP) Connectivity

Test if the server responds to ping from your local terminal:

```shell
ping 46.62.153.100
PING 46.62.153.100 (46.62.153.100) 56(84) bytes of data.
64 bytes from 46.62.153.100: icmp_seq=1 ttl=128 time=43.2 ms
64 bytes from 46.62.153.100: icmp_seq=2 ttl=128 time=41.4 ms
64 bytes from 46.62.153.100: icmp_seq=3 ttl=128 time=41.7 ms
64 bytes from 46.62.153.100: icmp_seq=4 ttl=128 time=41.2 ms
^C
--- 46.62.153.100 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3006ms
rtt min/avg/max/mdev = 41.180/41.867/43.232/0.808 ms                                                      
```

An answer shows that icmp is allowed.

## SSH Fails (As Expected)

Attempt to SSH into the server:

```shell
ssh root@46.62.153.100 
ssh: connect to host 46.62.153.100 port 22: Connection refused
```

This is expected because port 22 is not yet open in the firewall.

## Enable SSH Access (Port 22)

Add a new inbound rule to the [firewall](../../exercise_1/step-by-step/firewall.md#create-a-new-firewall):
- Protocol: **TCP**
- Port: **22**

```shell
ssh root@46.62.153.100                                          
The authenticity of host '46.62.153.100 (46.62.153.100)' can't be established.
ED25519 key fingerprint is SHA256:sCLqlMvbAbUjDFUt3I5qf7E8UMxDkp6MsL4APMJ0wwU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '46.62.153.100' (ED25519) to the list of known hosts.
Linux debian-2gb-hel1-1 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
root@debian-2gb-hel1-1:~# hostname
debian-2gb-hel1-1
```

## Update & Reboot for Security

Keep your server packages up-to-date for protection against vulnerabilities:

```shell
root@debian-2gb-hel1-1:~# apt update
Get:1 http://deb.debian.org/debian bookworm InRelease [151 kB]
Get:2 http://security.debian.org/debian-security bookworm-security InRelease [48.0 kB]
Get:3 http://deb.debian.org/debian bookworm-updates InRelease [55.4 kB]                    
...
Building dependency tree... Done
Reading state information... Done
3 packages can be upgraded. Run 'apt list --upgradable' to see them.
root@debian-2gb-hel1-1:~# apt upgrade
...
  libicu72 libxml2 sudo
3 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
...
                                         
root@debian-2gb-hel1-1:~# 
```

```shell
root@debian-2gb-hel1-1:~# reboot
```

Regular updates patch known exploits and bugs in system packages.