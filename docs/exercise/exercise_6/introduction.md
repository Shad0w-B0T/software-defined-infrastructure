# SSH Hopping

SSH hopping is a method of accessing a remote server (Host B) that cannot be reached directly from your local machine —
typically due to firewall rules or network restrictions.
Instead, you first connect to an intermediate server (Host A), which has access to Host B. From there, you "hop" to Host
B using SSH.

## Requirements:

- Two SSH-capable Linux servers (Host A and Host B) – [see setup here]
- An SSH key pair – [see setup here]
- SSH access from your local workstation to Host A

## Procedure

### 1. Create Two Servers

Server 1 is created as shown below:

<ImageWithCaption src="/images/exercise_6/private_network.png" alt="Server UI" :caption="'1. Create the first server with a private network enabled.'" :number="1" />

<ImageWithCaption src="/images/exercise_6/private_network_modal.png" alt="Server UI" :caption="'2. Confirm private network creation in the server modal dialog.'" :number="2" />

The second server is then created as follows:

<ImageWithCaption src="/images/exercise_6/private_network_hop.png" alt="Server UI" :caption="'3. Create the second server and attach it to the same private network.'" :number="3" />


The servers are now configured as follows:

**Gateway Server** (public-facing)

- Public IP: 46.62.153.100 
- Private IP: 10.0.0.2

**Internal Server** (only reachable via Host A)

- Private IP: 10.0.0.3

### 2. Edit SSH Configuration

In order to enable SSH agent forwarding, you will need to adjust your SSH client configuration. This means that your local 
SSH agent, which stores your private key, can be used when connecting through multiple hosts without you having to copy your 
private key to each intermediate host.

Open the file `~/.ssh/config` (create it if it doesn't exist) and add the following block:

```shell
Host <hostname>
  ForwardAgent yes
```

::: tip 💡 Tip
This allows you to access further internal systems (like Host B) from Host A without copying your private key. 
Ensure that your SSH agent is running and that your private key has been added to it.
:::


### 3. Connect to Host A

Once you have enabled SSH agent forwarding and loaded your key into the agent, you can connect to Host A (the gateway server) 
from your local machine using the following command:

```shell
ssh root@46.62.153.100
The authenticity of host '46.62.153.100 (46.62.153.100)' can't be established.
ED25519 key fingerprint is SHA256:KpkdzNrhi/nAUiMbQ/5YXf/fgaxqQLmixzrmiT2WBxY.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '46.62.153.100' (ED25519) to the list of known hosts.
Linux gateway 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Jul  8 20:18:04 2025 from 217.247.108.198
root@gateway:~# 
```

You are now logged in to Host A (the gateway) and can access Host B from here.

### 4. Connect from Host A to Host B

Once you have logged into Host A, you can establish an SSH connection to Host B, which can only be accessed from within the internal network.

```shell
root@gateway:~# ssh 10.0.0.3
Linux internal 6.1.0-37-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.140-1 (2025-05-22) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
root@internal:~# 
```

::: tip 💡 Success
If agent forwarding is configured correctly, no password or passphrase will be required when connecting from Host A to Host B.
:::

### 5. Close the Connections

Once you have finished working on Host B and Host A, close the SSH sessions in reverse order.

```shell
root@internal:~# exit
logout
Connection to 10.0.0.3 closed.
root@gateway:~# exit
logout
Connection to 46.62.153.100 closed.
```

### 6. Attempt to Connect from Host B Back to Host A

In most cases, it will not be possible to connect from Host B back to Host A because Host A’s address is usually either private 
or inaccessible from Host B directly. However, you can test this using any reachable address as a demonstration.

```shell
ssh root@10.0.0.3
ssh: connect to host 10.0.0.3 port 22: Connection refused
```

## Observation and Explanation:

This connection will only succeed if Host B has access to the SSH agent or the private key itself. However, this is 
usually not possible because SSH agent forwarding only works in one direction, and private keys are never copied to 
remote hosts. Your private SSH key remains securely on your local machine and is only made available to the current 
connection chain (local workstation → Host A → Host B). Forwarding is not recursive and does not extend beyond this chain.

SSH agent forwarding is a secure method of accessing a remote host via an intermediate host without copying your private 
key. Directly connecting to an internal host (Host B) is generally impossible if Host B is not on the same network as your 
local machine. Connecting from Host B back to Host A is only possible if Host B itself has access to a valid SSH key or agent.


