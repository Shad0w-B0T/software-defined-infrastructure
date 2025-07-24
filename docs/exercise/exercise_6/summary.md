# Summary

- Create two servers: a public gateway server (Host A) and an internal server (Host B) on a private network.
- Configure SSH agent forwarding in your local SSH client to allow seamless authentication through Host A.
- Connect from your local machine to Host A using SSH.
- From Host A, connect to Host B, which is only reachable via the private network.
- Close SSH sessions in reverse order to return to your local workstation.
- Attempting to SSH back from Host B to Host A usually fails because agent forwarding is one-directional and private keys are not copied.
- Understand that SSH agent forwarding securely forwards your credentials only along the connection chain and does not enable recursive forwarding.

## Further Resources & References

- [SSH Agent Forwarding (GitHub Docs)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding)  
  Detailed explanation of SSH agent forwarding, how it works, and best practices.
