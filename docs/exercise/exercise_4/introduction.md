# SSH Agent Setup Guide

This guide explains how to install and use the ssh-agent program to simplify SSH access by loading your private key into 
memory for the duration of a session. Once unlocked, you won't need to reenter your passphrase for subsequent connections.

## What is `ssh-agent`?

The `ssh-agent` program runs in the background, holding your SSH private keys in memory and managing authentication on your 
behalf. It is especially useful when using passphrase-protected SSH keys.

---

## Step-by-step Instructions

### **Install ssh-agent**

Most modern systems have `ssh-agent` pre-installed. If not, install it using your package manager.

**Debian/Ubuntu:**
```bash
sudo apt update
sudo apt install openssh-client
```

### Start the ssh-agent

```bash
eval "$(ssh-agent -s)"
```
This will start the agent and export environment variables so your shell can talk to it.

### Add your SSH key to the agent

```bash
ssh-add ~/.ssh/id_ed25519
```
Replace with your actual key file if different. You'll be prompted for your passphrase once.

### Verify loaded keys

```bash
ssh-add -l
```

### Use it!
You can now SSH into multiple servers without being prompted for your key's passphrase again during the session.

```bash
ssh user@your-server.com
```

::: tip 💡 Session Reuse
As long as your terminal session is active and the agent is running, your key will remain unlocked, enabling secure, 
passwordless SSH access across multiple logins.
:::
