# Collection

## How to Use Terraform

This guide explains how to deploy your infrastructure using Terraform in a structured, repeatable manner.

### Initialize Terraform

Before using Terraform, you must initialize the project directory. This process downloads the necessary provider plugins and prepares your environment.

```bash
terraform init
```

### Preview the Execution Plan

To see the changes that Terraform will make without applying them, run the following command:

```bash
terraform plan
```

::: tip 💡 Hint
This step is optional but highly recommended to verify your setup before deploying.
:::

### Apply the Configuration

To create the defined infrastructure on the cloud provider, run:

```bash
terraform apply
```

Terraform will show a summary of actions to be performed. Confirm with yes when prompted to proceed.