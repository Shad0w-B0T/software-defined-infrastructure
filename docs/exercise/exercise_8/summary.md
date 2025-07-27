# Summary

- X11 forwarding allows running graphical applications on a remote Linux server and displaying them on your local machine over an SSH connection.
- It securely tunnels GUI data through SSH, enabling encrypted and authenticated access even when only SSH port `22` is open.
- Requires the `xauth` package on the remote host and a local X11 server running on your machine.
- Use the ssh `-Y` or ssh `-X` option to enable X11 forwarding when connecting.
- Applications like Firefox can be launched remotely but will display on your local desktop, allowing interaction as if they were running locally.

## Further Resources & References

- [Unix & Linux](https://unix.stackexchange.com/questions/12755/how-to-forward-x-over-ssh-to-run-graphics-applications-remotely)  
  Practical tutorial on launching GUI applications on remote servers via SSH.

- [SSH Manual Page (man ssh)](https://man.openbsd.org/ssh)  
  Official SSH documentation with all options including X11 forwarding.
