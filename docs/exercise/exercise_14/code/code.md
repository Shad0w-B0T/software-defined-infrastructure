# Exercise 14

<script setup>
import main from '../../../../src/exercise_14/main.tf?raw'
import output from '../../../../src/exercise_14/outputs.tf?raw'
import variables from '../../../../src/exercise_14/variables.tf?raw'
import secrets from '../../../../src/exercise_14/secrets.auto.tfvars.template?raw'
import userData from '../../../../src/exercise_14/tpl/userData.yml?raw'
import scp from '../../../../src/exercise_14/tpl/scp.sh?raw'
import ssh from '../../../../src/exercise_14/tpl/ssh.sh?raw'
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

``scp.sh``
<CodeInclude :content="scp" />

``ssh.sh``
<CodeInclude :content="ssh" />



```file src/exercise_14/main.tf hcl
```

```file src/exercise_14/outputs.tf hcl
```

```file src/exercise_14/secrets.auto.tfvars.template hcl
```

```file src/exercise_14/variables.tf hcl
```

```file src/exercise_14/tpl/userData.yml yml
```

The same applies here as in the previous case, but in this instance, the Nginx server is not included. This configuration can be found in
[src-exercise-13-tpl-userdata-yml](/exercise/exercise_13/code/code.html#src-exercise-13-tpl-userdata-yml)

```file src/exercise_14/tpl/scp.sh shell
```

This is a Bash script that serves as a wrapper for the `scp` command to securely copy files.

- It defines a variable `GEN_DIR` pointing to a `gen` directory relative to the script location.
- It checks if at least two arguments are provided; if not, it prints a usage message indicating how to use `scp` with 
the user `devops` and a specified IP address.
- If the required arguments are present, it executes the `scp` command with the option `-o UserKnownHostsFile` set to 
use a custom `known_hosts` file located in the `gen` directory.


```file src/exercise_14/tpl/ssh.sh shell
```

This is a Bash script that acts as a wrapper for the `ssh` command to connect securely to a remote server.

- It sets the `GEN_DIR` variable to point to a `gen` directory located relative to the script's directory.
- It runs the `ssh` command to connect as the user `devops` to the host specified by the environment variable `${ip}`.
- The `-o UserKnownHostsFile` option tells `ssh` to use a custom `known_hosts` file located in the `gen` directory.
- Any additional arguments passed to the script are forwarded to the `ssh` command.
