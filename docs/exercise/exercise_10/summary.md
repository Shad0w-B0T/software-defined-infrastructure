# Summary

- Monitoring `/var/log/auth.log` allows real-time observation of authentication events such as logins and failures.
- The `tail -f` command is an effective way to continuously follow log updates as they happen.
- Simulating SSH logins with a partner helps generate live authentication events to better understand log behavior.
- Ensuring `rsyslog` is installed and running is essential for proper logging of authentication activities.

## Further Resources & References

- [Hetzner Cloud Documentation](https://docs.hetzner.com/cloud/)  
  Official Hetzner Cloud resources and guides for server management.

- [rsyslog Official Website](https://www.rsyslog.com/)  
  Comprehensive information on rsyslog, the system logging daemon used for logging authentication events.

- [Linux man page for tail](https://man7.org/linux/man-pages/man1/tail.1.html)  
  Documentation for the `tail` command including the `-f` option to follow file changes in real-time.

- [SSH Manual Page](https://man.openbsd.org/ssh)  
  Detailed information on SSH client usage, including login procedures and options.
