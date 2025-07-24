# Step-by-step Instructions

Before you begin, verify that your system is configured to log authentication events properly.

If the file `/var/log/auth.log` does not exist, install or reinstall the `rsyslog` service with the following commands:

```shell
sudo apt-get install --reinstall rsyslog
sudo systemctl enable --now rsyslog
```

This will ensure that authentication logs are correctly recorded in `/var/log/auth.log`.

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