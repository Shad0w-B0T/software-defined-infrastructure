# Reacreate

<ImageWithCaption
  src="/images/exercise_2/recreate_1.png"
  alt="Server UI"
  :caption="'Possible to recreate'"
  :number="1"
/>

## Reconnect via ssh

```bash
daniel@debian:~$ ssh root@138.199.156.125
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:AvaZueezL0+mXYRtglZ1VBt3vhJlGhi6GCTp9SIzv/Y.
Please contact your system administrator.
Add correct host key in /home/daniel/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/daniel/.ssh/known_hosts:5
  remove with:
  ssh-keygen -f "/home/daniel/.ssh/known_hosts" -R "138.199.156.125"
Host key for 138.199.156.125 has changed and you have requested strict checking.
Host key verification failed.
```

## What Does This Message Mean?

This is an SSH security feature.

When you first connect to a server, your SSH client saves the server’s host key in the ~/.ssh/known_hosts file.

If the host key for that IP address later changes (because a different server is now using that IP),
SSH will detect a mismatch and show this warning to prevent you from unknowingly connecting to a potentially malicious server.

This is designed to prevent man-in-the-middle (MITM) attacks.

<ButtonLink url="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">About man-in-the-middle attacks</ButtonLink>

## Why Does This Happen?

This warning appears because the newly created server has a different SSH host key than the previously deleted one,
even though it uses the same IP.

SSH correctly detects that the host identity changed, and warns the user to avoid blindly trusting a
possibly compromised server.

## How to Fix It

To resolve the issue, you need to remove the old key associated with the reused IP address from your local known_hosts file.

```bash
daniel@debian:~$ ssh-keygen -R 138.199.156.125
# Host 138.199.156.125 found: line 3
# Host 138.199.156.125 found: line 4
# Host 138.199.156.125 found: line 5
/home/dayhawk/.ssh/known_hosts updated.
Original contents retained as /home/dayhawk/.ssh/known_hosts.old
```

The SSH client will prompt you to accept the new host key. After accepting it, the warning will not appear
again unless the key changes again.


## Alternative Fix: Use a Separate known_hosts File

<Note>
    This disables SSH host verification for that connection, which weakens security and should only be used in trusted
    environments (e.g. testing or automation).
</Note>

Instead of modifying your default `~/.ssh/known_hosts`, you can tell SSH to use a different file for storing (or ignoring) host key information for a specific connection.

This avoids conflicts when working with frequently recycled IPs or dynamic infrastructure.

Use the `-o UserKnownHostsFile=<path>` option:

```bash {{ title: 'Use a separate known_hosts file for this connection' }}
ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@37.27.32.138
```

Explanation:

- `UserKnownHostsFile=/dev/null`: Disables storing or checking the host key against the default file.
- `StrictHostKeyChecking=no`: Automatically accepts the new host key without prompting.

