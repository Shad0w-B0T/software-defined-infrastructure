# SSH Port Forwarding

In this exercise, we will simulate a common real-world scenario.
A remote server can only be accessed via SSH (port `22`); all other incoming traffic, such as HTTP (port `80`), is blocked by the firewall.
However, we still need to access the web server running on that host via a browser. To do this, we will 
forward remote port 80 to local port 2000 using SSH.

## Prerequisites

- A Hetzner account with access to the Hetzner Cloud Console and an active project.
- Two [Hetzner Debian servers](/exercise/exercise_1/step-by-step/create-server.html) with SSH access enabled (Host A and Host B)
- An [SSH key pair](/exercise/exercise_3/step-by-step/ssh.html) configured for authentication
- SSH access from your local workstation to Host A
