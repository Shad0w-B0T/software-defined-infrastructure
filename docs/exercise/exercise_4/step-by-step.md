# Step-by-step Instructions

## **Install ssh-agent**

Most modern systems have `ssh-agent` pre-installed. If not, install it using your package manager.

**Debian/Ubuntu:**
```bash
sudo apt update
sudo apt install openssh-client
```

## Start the ssh-agent

```bash
eval "$(ssh-agent -s)"
```
This will start the agent and export environment variables so your shell can talk to it.

## Add your SSH key to the agent

```bash
ssh-add ~/.ssh/id_ed25519
```
Replace with your actual key file if different. You'll be prompted for your passphrase once.

## Verify loaded keys

```bash
ssh-add -l
```

## Use it!
You can now SSH into multiple servers without being prompted for your key's passphrase again during the session.

```bash
ssh user@your-server.com
```

::: tip 💡 Session Reuse
As long as your terminal session is active and the agent is running, your key will remain unlocked, enabling secure,
passwordless SSH access across multiple logins.
:::