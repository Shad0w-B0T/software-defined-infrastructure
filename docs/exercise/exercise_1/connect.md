# Connect to Your Server

Once your server is up and running, you can connect to it using SSH from your terminal or use Hetzner's web-based console.

## Ping the Server

Since ICMP is allowed through the firewall, you can test the server's availability by using the `ping` command.  
This is a simple way to check if the server is reachable and responding to network traffic.

Run the following command in your terminal:


```bash
daniel@debian:~$ ping 138.199.156.125
PING 138.199.156.125 (138.199.156.125) 56(84) bytes of data.
64 bytes from 138.199.156.125: icmp_seq=1 ttl=128 time=14.7 ms
64 bytes from 138.199.156.125: icmp_seq=2 ttl=128 time=12.6 ms
64 bytes from 138.199.156.125: icmp_seq=3 ttl=128 time=12.7 ms
64 bytes from 138.199.156.125: icmp_seq=4 ttl=128 time=12.6 ms
^C
--- 138.199.156.125 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3010ms
rtt min/avg/max/mdev = 12.555/13.133/14.700/0.905 ms
```

## Connect via SSH

Use the following command in your terminal to connect to your server:

```bash
ssh root@138.199.156.125
```

Make sure your SSH key is set up correctly, or you will be asked for the root password if no key is configured.

### First-Time SSH Connection Prompt

On the first connection, you may see a warning message like this:

```bash
daniel@debian:~$ ssh root@138.199.156.125
The authenticity of host '138.199.156.125 (138.199.156.125)' can't be established.
ED25519 key fingerprint is SHA256:zO9qZiiZBLu1oJIUfwyQvMAU3c1X7vfvvp90N4Dk6b0.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

What does this message mean?

This is a standard SSH security prompt.
It appears when your local machine has never connected to this IP address before and therefore does not have the host’s
key stored in the ~/.ssh/known_hosts file.

- "Can't be established": Your system cannot verify the identity of the server automatically.
- "Fingerprint": This is a unique identifier of the server's public SSH key.
You can manually verify it if the key was provided in advance.
- "Are you sure...": This prompt ensures you're connecting to the intended server and not a malicious one
(to prevent man-in-the-middle attacks).

If you trust the source (e.g., you just created the server), type yes.
The key will be saved locally, and the warning won’t appear next time.

### Enter the Root Password

After initiating the SSH connection and confirming the server's fingerprint, the system will prompt you to enter the **root password**

```bash
root@138.199.156.125's password:
Linux debian-4gb-fsn1-2 6.1.0-33-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.133-1 (2025-04-10) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
root@debian-4gb-fsn1-2:~#
```

## Connecting via the Console

If you need direct access to your server’s terminal, you can use the Hetzner Cloud Console feature.

1. Open your server’s detail page in the Hetzner Cloud Console.
2. Locate the **Console** tab or button as shown below:

<ImageWithCaption
  src="/images/exercise_1/connect_1.png"
  alt="Server UI"
  :caption="'Location of the console access button in the Hetzner interface'"
  :number="1"
/>

3. Click the console button to open a web-based terminal that connects you directly to your server.

<ImageWithCaption
  src="/images/exercise_1/connect_2.png"
  alt="Server UI"
  :caption="'Simple and immediate console connection via web interface'"
  :number="2"
/>

This is especially useful if SSH access is not available or if you need to perform recovery tasks.

## Keyboard Layout Fix (Optional)

If you notice incorrect characters being entered (e.g., `y` and `z` are swapped),
this is likely due to the default keyboard layout being set to **English (US)**.
This can be confusing if you're using a **German or other non-US keyboard**.

To switch the layout to match your physical keyboard (e.g., German layout), run:

```bash {{title: 'Reconfigure the keyboard layout on the server'}}
dpkg-reconfigure keyboard-configuration
setupcon
```

Follow the interactive prompts to choose the correct keyboard model and layout, such as:
- Keyboard model: Generic 105-key (Intl) PC
- Layout: German
- Variant: Default
After setup, the console input should match your keyboard as expected.
