# SSH 

now we create a ssh key.

why?

command used
ssh-keygen -a 256 -t ed25519 -C "$(hostname)-$(date +'%d-%m-%Y')"


infos zu ssh

"

Private key

        Keep it private!

        Define a good passphrase on key pair creation.

        Cannot be derived / re-engineered from corresponding public key.

Public key

    May be given to anybody.



https://www.ssh.com/academy/ssh/passphrase:

A good passphrase should have at least 15, preferably 20 characters and be difficult to guess. It should contain upper case letters, lower case letters, digits, and preferably at least one punctuation character. No part of it should be derivable from personal information about the user or his/her family. "

