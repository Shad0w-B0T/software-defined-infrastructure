# Exercise 13

<script setup>
import main from '../../../../src/exercise_13/main.tf?raw'
import output from '../../../../src/exercise_13/outputs.tf?raw'
import variables from '../../../../src/exercise_13/variables.tf?raw'
import secrets from '../../../../src/exercise_13/secrets.auto.tfvars.template?raw'
import userData from '../../../../src/exercise_13/tpl/userData.yml?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>


``main.tf``
<CodeInclude :content="main" />

``outputs.tf``
<CodeInclude :content="output" />

``variables.tf``
<CodeInclude :content="variables" />

``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

``userData.yml``
<CodeInclude :content="userData" />

```file src/exercise_13/main.tf hcl
```

```file src/exercise_13/outputs.tf hcl
```

```file src/exercise_13/secrets.auto.tfvars.template hcl
```

```file src/exercise_13/variables.tf hcl
```

```file src/exercise_13/tpl/userData.yml yml
```

This `cloud-config` file automates the initial setup of a Linux server.

It begins by creating a user (`${loginUser}`) with a Bash shell, full passwordless sudo privileges, and an authorized 
SSH public key. This user is also added to the `sudo` and `systemd-journal` groups for administrative access and logging permissions.

To improve security, SSH password authentication and root login are disabled.

The system is updated and upgraded, and the following packages are installed:

- `nginx` – for serving web content
- `fail2ban` – for intrusion prevention
- `plocate` – for fast file indexing
- `python3` and `python3-systemd` – for scripting and system integration

A custom Fail2Ban configuration is written to `/etc/fail2ban/jail.local`, enabling protection on the SSH port with a ban
policy based on failed login attempts.

During startup, the following commands are executed:

- Nginx is enabled and started.
- `/var/www/html` is cleared.
- A new `index.html` is created showing the server’s public IP (queried via `dig`) and the current UTC time.
- The file indexing database is updated.
- Fail2Ban is enabled and restarted.
- SSH configuration is modified to disable password and root login, and the SSH service is restarted.

This results in a hardened, automatically configured web server that is ready to serve content securely.

