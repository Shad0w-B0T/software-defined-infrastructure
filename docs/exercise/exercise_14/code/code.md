# Exercise 14

```file src/exercise_14/main.tf hcl
```

```file src/exercise_14/outputs.tf hcl
```

```file src/exercise_14/variables.tf hcl
```

```file src/exercise_14/secrets.auto.tfvars.template hcl
```

```file src/exercise_14/tpl/userData.yml yml
```

The same applies here as in the previous case, but in this instance, the Nginx server is not included. This configuration can be found in
[Exercise 13 userdata.yml](/exercise/exercise_13/code/code.html#userdata-yml)

```file src/exercise_14/tpl/scp.sh sh
```

This is a Bash script that serves as a wrapper for the `scp` command to securely copy files.

- It defines a variable `GEN_DIR` pointing to a `gen` directory relative to the script location.
- It checks if at least two arguments are provided; if not, it prints a usage message indicating how to use `scp` with
  the user `devops` and a specified IP address.
- If the required arguments are present, it executes the `scp` command with the option `-o UserKnownHostsFile` set to
  use a custom `known_hosts` file located in the `gen` directory.

```file src/exercise_14/tpl/ssh.sh sh
```

This is a Bash script that acts as a wrapper for the `ssh` command to connect securely to a remote server.

- It sets the `GEN_DIR` variable to point to a `gen` directory located relative to the script's directory.
- It runs the `ssh` command to connect as the user `devops` to the host specified by the environment variable `${ip}`.
- The `-o UserKnownHostsFile` option tells `ssh` to use a custom `known_hosts` file located in the `gen` directory.
- Any additional arguments passed to the script are forwarded to the `ssh` command.
