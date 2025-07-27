# How to Use Terraform

This guide explains how to deploy your infrastructure using Terraform in a structured, repeatable manner.

## Initialize Terraform

Before using Terraform, you must initialize the project directory. This process downloads the necessary provider plugins and prepares your environment.

```bash
terraform init
```

## Preview the Execution Plan

To see the changes that Terraform will make without applying them, run the following command:

```bash
terraform plan
```

::: tip 💡 Hint
This step is optional but highly recommended to verify your setup before deploying.
:::

## Apply the Configuration

To create the defined infrastructure on the cloud provider, run:

```bash
terraform apply
```

Terraform will show a summary of actions to be performed. Confirm with yes when prompted to proceed.

## Terraform State


Terraform stores infrastructure state in a file called `terraform.tfstate`.
By default, this file is saved **locally**, i.e. only on the computer of the user who ran `terraform apply`.

### Common Problems (as seen in this course)

In the context of this course, the local state caused several issues:

- **Inconsistent environments**: When multiple students or group members worked on the same infrastructure, they did not share state — leading to desynchronization.
- **Manual fixes required**: To "reset" infrastructure or fix inconsistencies, we often used:

 ```bash
terraform destroy
```

This worked, but only because no shared infrastructure or production system was involved. In real-world scenarios, 
this would be risky and error-prone.

**Overwrites and resource mismatches**: If one person created infrastructure, others could not see or manage it unless 
they had the exact same state file — which they didn't.

### Why This Happens

Terraform doesn't know what someone else has deployed unless it has access to their `terraform.tfstate` file. 
Without shared state, each user has a completely isolated view of the infrastructure.

### The Correct Way: Remote State

In team environments or shared infrastructures, the **right approach** is to use **remote state**. This allows all users to share a single,
consistent view of the infrastructure.

Benefits of remote state:

- Shared access to infrastructure definitions
- Centralized source of truth
- Locking support to prevent concurrent modifications
- Optional versioning and audit logs

**Example (S3 backend):**

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "project/team/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
```

Other backend options include:

- Gitlab repository
- Terraform Cloud or Enterprise
- Azure Blob Storage
- Google Cloud Storage
- HTTP or Consul-based solutions

::: info 

For this course, local state is fine for isolated exercises. But in collaborative or production setups,
always use remote state to avoid losing control over your infrastructure.

:::