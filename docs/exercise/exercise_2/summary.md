# Summary

- SSH shows a warning when the host key for an IP address changes
- Cause: New server uses the same IP but has a different SSH host key
- This is a security feature to prevent man-in-the-middle attacks
- Fix: Remove the old host key from `known_hosts` using `ssh-keygen -R <IP>`
- After removal, SSH will prompt to accept the new host key without warnings
- Alternative: Use a separate `known_hosts` file with `UserKnownHostsFile=/dev/null` and `StrictHostKeyChecking=no`
- This alternative reduces security and should only be used in testing or automation
- In Hetzner Cloud, IPs can be marked as "unassigned" to reserve and reuse them
- Reserved IP addresses incur costs even if not actively used

## Further Resources & References

- [Hetzner Cloud: Rescue System](https://docs.hetzner.com/cloud/servers/getting-started/rescue-system)  
  Guide to using the rescue system in Hetzner Cloud for troubleshooting and recovery.

- [SSH.com Academy: SSH Host Key](https://www.ssh.com/academy/ssh/host-key)  
  Detailed explanation of SSH host keys, their role in security, and how they prevent man-in-the-middle attacks.

- [Wikipedia: Man-in-the-middle Attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)  
  Overview of MITM attacks, how they work, and common prevention methods.

- [OpenBSD Manual: ssh-keygen](https://man.openbsd.org/ssh-keygen)  
  Official manual for the `ssh-keygen` tool, covering key generation and management.