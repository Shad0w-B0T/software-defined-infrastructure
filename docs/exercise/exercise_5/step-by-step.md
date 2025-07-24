# Step-by-step Instructions

### **Check for existing SSH keys**

First, check to see if you already have an SSH key.

```bash
ls ~/.ssh/id_*.pub
```

If you see a file like `id_ed25519.pub` or `id_rsa.pub`, you already have a key.

### Copy your public key

```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the entire output to your clipboard.

### Add SSH key to your MI GitLab account

1. Log in to [gitlab.mi.hdm-stuttgart.de](https://gitlab.mi.hdm-stuttgart.de)
2. Go to your **profile picture** → **Preferences**
3. Navigate to **SSH Keys**
4. Paste the key into the Key field
5. Add a meaningful Title (e.g., "Dev Laptop")
6. Set an optional **expiration date** and click Add Key

:::warning ⚠️ Long expiration dates

Avoid setting extremely long or infinite expiration dates for SSH keys.  
Long-lived keys pose a security risk: if your device is lost or compromised, an attacker could use your key indefinitely.

**Tip:** Use an expiration date that reflects your project or semester timeline, and rotate keys regularly (e.g., every 3–6 months).

:::

### Clone a GitLab repository
Use the SSH URL format:

```bash
git clone git@gitlab.mi.hdm-stuttgart.de:<group>/<project>.git
```

### Test Git operations

Move into the cloned repo:

```bash
cd exercise
```

Try:

```bash
git pull
git push
```