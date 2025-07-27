# Hetzner Zombie Server Issue

## Context

When using Terraform to manage infrastructure on Hetzner Cloud, an issue has been observed where 
**firewalls are not properly deleted** when a server is destroyed using:

```bash
terraform destroy
```

Even though the server no longer exists, the associated firewall rules may remain active and 
**still appear to be attached** to the deleted server.

## Observed Behavior

- After destroying infrastructure, firewall resources are often left behind in Hetzner Cloud.
- These firewall rules still reference non-existent servers ("zombie servers").
- Attempts to delete or modify them manually via the Hetzner UI or API may sometimes fail or produce confusing errors.
- This can lead to:
  - Orphaned firewall rules
  - Conflicts when redeploying infrastructure
  - Unclear or broken security configurations

## Root Cause

At first, it was assumed this was a Terraform bug or a misconfiguration. However, community reports and our own experience 
suggest that this is a **Hetzner-side issue**, affecting many users.

See community discussion: [Reddit: Firewalls stuck with zombie servers](https://www.reddit.com/r/hetzner/comments/1m8crn7/firewalls_stuck_with_zombie_servers/)

## Implications

- **Security risk**: Firewalls may remain open or misconfigured even after destroying servers.
- **Resource clutter**: Firewalls accumulate over time, leading to bloated project environments.
- **Unexpected behavior**: Redeploying infrastructure can lead to inconsistent states or failed deployments due to leftover associations.

## Workarounds

- After running `terraform destroy`, manually check the **Hetzner Cloud Console** for any remaining firewall rules.
- Manually delete leftover firewall resources if they’re not automatically cleaned up.
- Avoid reusing the same server names or firewall labels until cleanup is confirmed.

::: warning ⚠️ Warning

Until this issue is fully resolved by Hetzner, treat all firewall resources as potentially persistent and check manually after infrastructure teardown.

:::
