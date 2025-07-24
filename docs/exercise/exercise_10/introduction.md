# Monitor Authentication Logs in Real-Time

This guide explains how to monitor login activity on your VM by examining the `/var/log/auth.log` file. You will be able 
to observe authentication events in real time and simulate an SSH login with a partner.

## Prerequisites

Before starting, ensure that your system is correctly set up to log authentication events.

If `/var/log/auth.log` is missing, install or reinstall `rsyslog`:

```shell
sudo apt-get install --reinstall rsyslog
sudo systemctl enable --now rsyslog
```

This ensures that authentication logs are written to `/var/log/auth.log`.

## Monitor the Authentication Log

Log in to your VM and run the following command:

```shell
sudo tail -f /var/log/auth.log
```

This command will continuously display the latest log entries as they occur.

## Simulate a Login Event

```shell
ssh root@46.62.153.102
```

## Output

```shell
root@debian-2gb-hel1-1:/var/log# tail -f /var/log/auth.log 
2025-07-08T22:25:55.957090+00:00 debian-2gb-hel1-1 sudo: pam_unix(sudo:session): session closed for user root
2025-07-08T22:26:19.920891+00:00 debian-2gb-hel1-1 sshd[4469]: Connection reset by 217.247.108.198 port 59128 [preauth]
2025-07-08T22:29:03.354757+00:00 debian-2gb-hel1-1 sshd[4471]: Invalid user ubnt from 80.94.95.115 port 62018
2025-07-08T22:29:03.464591+00:00 debian-2gb-hel1-1 sshd[4471]: pam_unix(sshd:auth): check pass; user unknown                           
2025-07-08T22:29:03.464771+00:00 debian-2gb-hel1-1 sshd[4471]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=80.94.95.115 
2025-07-08T22:29:05.463019+00:00 debian-2gb-hel1-1 sshd[4471]: Failed password for invalid user ubnt from 80.94.95.115 port 62018 ssh2
2025-07-08T22:29:06.396824+00:00 debian-2gb-hel1-1 sshd[4471]: Connection closed by invalid user ubnt 80.94.95.115 port 62018 [preauth]
2025-07-08T22:30:11.748744+00:00 debian-2gb-hel1-1 sshd[4474]: error: kex_exchange_identification: read: Connection reset by peer
2025-07-08T22:30:11.749239+00:00 debian-2gb-hel1-1 sshd[4474]: Connection reset by 45.140.17.26 port 43057
2025-07-08T22:30:13.280993+00:00 debian-2gb-hel1-1 sshd[4475]: Connection closed by 14.63.166.251 port 57141 [preauth]
```


## Prerequisites

- test
- test