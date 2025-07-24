# SSH Agent Setup Guide

This guide explains how to install and use the ssh-agent program to simplify SSH access by loading your private key into 
memory for the duration of a session. Once unlocked, you won't need to reenter your passphrase for subsequent connections.

## What is `ssh-agent`?

`ssh-agent` is a background process that manages your SSH private keys and handles authentication requests. It enables:

- Passwordless SSH access after a one-time unlock
- Secure handling of passphrase-protected keys
- More convenient and secure workflows when working with multiple remote systems

## Prerequisites

To follow this guide, make sure you have:

- SSH installed on your local machine (typically preinstalled on Linux/macOS, or available via tools like Git Bash on Windows).