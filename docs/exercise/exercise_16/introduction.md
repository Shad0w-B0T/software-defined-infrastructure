# Custom Volume Mounting with Terraform & Cloud-init (Hetzner)

This guide documents how to:

- Manually define a mount point for a Hetzner Cloud Volume (e.g. `/volume1`)
- Avoid Terraform cyclic dependencies by decoupling volume and server creation
- Use Cloud-init to configure and mount the volume automatically on first boot
- Verify the correct configuration

## Terraform Resources Overview

- `hcloud_volume`: defines a 10 GB `xfs` volume (unattached)
- `hcloud_server`: creates the instance with `cloud-init`
- `hcloud_volume_attachment`: manually attaches the volume (with `automount = false`)
- `templatefile`: generates the `userData.yml` from template and injects volume name + device

::: warning 💡 Volume and server must be in the same region!
For example: `location = "nbg1"` in both `hcloud_server` and `hcloud_volume`.
:::


## Verification Steps

After applying Terraform and booting the server:

### Check that the mount point was created

```shell
ls -ld /volume1
```

Expected output:

```shell
drwxr-xr-x 2 root root 6 Jul 18 13:16 /volume1
```

### Check that `/etc/fstab` includes the volume

```shell
cat /etc/fstab | grep /volume1
```

Expected output:

```shell
/dev/disk/by-id/scsi-0HC_Volume_102928385 /volume1 xfs rw,defaults 0 2
```

### Check that the volume is mounted

```shell
df -h | grep /volume1
```

Expected output:

```shell
/dev/sdb         10G  104M  9.9G   2% /volume1
```

## Persistence Test

Reboot the server:

```shell
sudo reboot
```

Then reconnect via SSH and re-run:

```shell
df -h | grep /volume1
```

The volume should still be mounted. This confirms the `/etc/fstab` entry works on boot.
