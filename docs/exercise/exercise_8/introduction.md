# X11 Forwarding: GUI Applications via SSH

This guide explains how to securely access remote graphical applications (such as Firefox) via SSH using X11 forwarding,
even when only port `22` (SSH) is open. X11 forwarding allows you to run GUI programs on a remote Linux server and display them locally on your machine,
which is especially useful when direct access to graphical interfaces is not possible due to firewall restrictions or when working on headless servers.

With X11 forwarding, all graphical data is tunneled securely through the SSH connection, 
enabling encrypted and authenticated access to remote applications without exposing additional ports.

## Prerequisites

- SSH client configured to support X11 forwarding (e.g., ssh `-Y` or ssh `-X`)