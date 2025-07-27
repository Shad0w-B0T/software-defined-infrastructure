# Setup Environment for Terraform Projects

Each Terraform subproject contains a `secrets.auto.tfvars.template` file, which defines required configuration values.

To activate these values during Terraform execution, you must **rename or copy** this file to: `secrets.auto.tfvars`


This renamed file is automatically loaded by Terraform and should include key configuration values such as:

```hcl
hcloud_token = ""
public_key   = ""
```

These variables are commonly used across most subprojects and can therefore be 
provided globally using **environment variables** instead of hardcoding them in each `.tfvars` file.

## Supplying Secrets via Environment Variables

Terraform allows variable values to be injected via environment variables using the following naming convention:

```bash
TF_VAR_<variable_name>=<value>
```

To supply the two common values globally, you can export them like this:

```bash
export TF_VAR_hcloud_token="your-hcloud-token-here"
export TF_VAR_public_key="$(cat ~/.ssh/id_rsa.pub)" # or any other public key
```

You can add these exports to your shell profile (e.g., `.bashrc`, `.zshrc`, or `.profile`) to make them persist across sessions.

## Why Use Environment Variables?

Keeps sensitive information like tokens out of version control.
- Simplifies switching between projects without modifying local files.
- Works seamlessly with Terraform’s built-in variable loading mechanism.

!!! warning

If both `TF_VAR_*` and `.tfvars` values are present, Terraform uses the value from .tfvars unless explicitly overridden.

!!!
