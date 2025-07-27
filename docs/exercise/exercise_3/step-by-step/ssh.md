# SSH Key Generation and Security Guide

## Why Use SSH Keys?

SSH keys are a secure and convenient way to access servers without using passwords. They provide stronger authentication, 
are less vulnerable to brute-force attacks, and support automation (e.g., via scripts or infrastructure tools like Ansible).

## How to Generate a Secure SSH Key

Use the following command to generate a strong SSH key pair:

```bash
ssh-keygen -a 256 -t ed25519 -C "$(hostname)-$(date +'%d-%m-%Y')"
```

Explanation:

- `-t ed25519`: Uses the **Ed25519** algorithm, which is more secure and faster than **RSA**.
- `-a 256`: Increases the number of key derivation function rounds, making brute-force attacks on your passphrase more difficult.
- `-C "$(hostname)-$(date +'%d-%m-%Y')"`: Adds a comment to help identify the key (e.g., server name and date).

You will be prompted to:

- Choose the key location (default is `~/.ssh/id_ed25519`)
- Enter and confirm a secure passphrase

## Key Types and Handling

### Private Key

- **Keep it secret** — never share it with anyone!
- Store it in `~/.ssh/` with restricted permissions (`chmod 600`)
- Protect it with a **strong passphrase**
- The private key **cannot** be reconstructed from the public key

### Public Key

- Safe to share and upload to servers or cloud providers
- Typically stored as `~/.ssh/id_ed25519.pub`
- Can be used to grant access to remote systems (e.g., adding it to `~/.ssh/authorized_keys` on the server)

## Passphrase Best Practices

A strong passphrase protects your private key in case it is stolen or exposed.

A good passphrase should:

- Be at least **15–20** characters long
- Include uppercase, lowercase, digits, and punctuation
- Avoid personal information (like names, birthdays, etc.)
- Be easy to remember but hard to guess

