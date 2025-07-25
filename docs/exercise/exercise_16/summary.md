# Summary

In this exercise, we learned how to define a custom mount point (e.g., `/volume01`) for 
a Hetzner Cloud volume using Terraform and Cloud-init. This method provides more control 
and predictability compared to Hetzner's default behavior, which automatically mounts 
volumes to paths like `/mnt/HC_Volume_*`.

Instead of relying on automount, the volume is explicitly attached using `hcloud_volume_attachment` with `automount = false`.

We then used a Cloud-init configuration to:
- Create the desired mount point
- Add a corresponding entry to `/etc/fstab`
- Reload systemd and mount the volume using `mount -a`

This approach is especially valuable for production setups where deterministic mount paths and consistent
infrastructure behavior are essential.

By the end of the exercise, the volume was mounted on boot and available at a predictable location,
confirming that the `/etc/fstab` configuration worked as expected.

## Further Resources & References

- [Hetzner Cloud Terraform Provider Documentation](https://registry.terraform.io/providers/hetznercloud/hcloud/latest/docs)
- [Cloud-init Documentation](https://cloud-init.io/)
- [fstab Man Page](https://man7.org/linux/man-pages/man5/fstab.5.html)
- [Terraform Templatefile Function](https://developer.hashicorp.com/terraform/language/functions/templatefile)
- [Linux `mount` Command](https://man7.org/linux/man-pages/man8/mount.8.html)
- [Linux `systemctl daemon-reexec` and `daemon-reload`](https://man7.org/linux/man-pages/man1/systemctl.1.html)
