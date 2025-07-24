# Server re-creation

This section explains how to recreate a server using the Hetzner Cloud Console.

- Using the Recreate option to redeploy a server with the same settings
- Why SSH shows a host key mismatch warning after recreating
- How to resolve the SSH warning by updating or removing the old host key
- An optional workaround to bypass host key checks (not recommended for production)

By the end, you'll understand how to safely reconnect to a recreated server.

## Prerequisites

To follow this guide, make sure you have:

- A Hetzner account with access to the Hetzner Cloud Console and an active project.
- SSH installed on your local machine (typically preinstalled on Linux/macOS, or available via tools like Git Bash on Windows).
