# SSH Hopping

SSH hopping allows you to securely access a remote server (Host B) that is not directly reachable from your local machine due 
to network restrictions or firewall rules. Instead, you first connect to an intermediate server (Host A), which has access to Host B.
From Host A, you then "hop" to Host B using SSH.

## Requirements:

- A Hetzner account with access to the Hetzner Cloud Console and an active project.
- Two [Hetzner Debian servers](/exercise/exercise_1/step-by-step/create-server.html) with SSH access enabled (Host A and Host B)
- An [SSH key pair](/exercise/exercise_3/step-by-step/ssh.html) configured for authentication
- SSH access from your local workstation to Host A