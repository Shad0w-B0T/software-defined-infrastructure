# Auto-Mounting a Volume on Debian (Hetzner Cloud)

This guide will walk you through the process of partitioning a second volume (`/dev/sdb`), formatting it, mounting it 
manually and configuring it to mount automatically on system boot using the `/etc/fstab` file.

## Todo 

tf description

## Check Mounted Volumes

Run the following to see the current state of your disks:

```shell
df -h
```
Example output:
```shell
Filesystem      Size  Used Avail Use% Mounted on
udev            1.9G     0  1.9G   0% /dev
tmpfs           382M  668K  382M   1% /run
/dev/sda1        38G  1.3G   35G   4% /
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      241M  138K  241M   1% /boot/efi
/dev/sdb         10G  104M  9.9G   2% /mnt/HC_Volume_102927708
tmpfs           382M     0  382M   0% /run/user/0
```

If `/dev/sdb` is already mounted (e.g., `/mnt/HC_Volume_*`), unmount it:

```shell
sudo umount /mnt/HC_Volume_*
```

## Partition the Disk

The volume of Hetzner has 10GiB. The partitions are divided 50/50. So each partition gets 5GiB.

Use fdisk to create two primary partitions of 5 GiB each on `/dev/sdb`:

```shell
sudo fdisk /dev/sdb
```

Partitioning steps inside **fdisk**:

1. Press `n` to create a new partition → choose `p` (primary) → Partition `1`
   - First sector: Press `Enter`
   - Last sector: `+5G`
2. Repeat `n` for second partition → Partition `2`
    - First sector: Press `Enter`
    - Last sector: Press `Enter` (use remaining space)
3. Type `t` → then `1` → set type to `83` (Linux)
4. Type `t` → then `2` → set type to `83` (Linux)
5. Type `w` to write and exit

<Accordion title="Example output">

As the configuration process is a little more complex, here is the example output.

```shell
sudo fdisk /dev/sdb
Welcome to fdisk (util-linux 2.38.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-20971519, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-20971519, default 20971519): +5G

Created a new partition 1 of type 'Linux' and of size 5 GiB.

Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (2-4, default 2): 2
First sector (10487808-20971519, default 10487808):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (10487808-20971519, default 20971519):

Created a new partition 2 of type 'Linux' and of size 5 GiB.

Command (m for help): t
Partition number (1,2, default 2): 1
Hex code or alias (type L to list all): 83

Changed type of partition 'Linux' to 'Linux'.

Command (m for help): t
Partition number (1,2, default 2): 2
Hex code or alias (type L to list all): 83

Changed type of partition 'Linux' to 'Linux'.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```
</Accordion>

Then reboot:

```shell
sudo reboot
```

## Create Filesystems

Format the two partitions:

```shell
sudo mkfs.ext4 /dev/sdb1
sudo mkfs.xfs /dev/sdb2
```

## Mount the Partitions Manually

Create mount points:

```shell
sudo mkdir /disk1 /disk2
```

Mount the first partition:

```shell
sudo mount /dev/sdb1 /disk1
```

Get the UUID of the second partition:

```shell
sudo blkid /dev/sdb2
```

Use the UUID to mount the second:

```shell
sudo mount UUID=<your-uuid-here> /disk2
```

Example:
```shell
sudo mount UUID=dfe82aba-61a9-4b2d-b1a1-da009f3747ab /disk2
```

## Test Mounting

Write a test file:

```shell
echo "Hello Disk1" | sudo tee /disk1/test.txt
ls /disk1/test.txt
```

## Configure Auto-Mount in fstab

To ensure that your new partitions are automatically mounted at boot, you'll need to configure the `/etc/fstab` file.

Start by opening the file in a text editor:

```shell
sudo nano /etc/fstab
```

At the end of the file, add the following lines. These entries specify that `/dev/sdb1` should be mounted to `/disk1` using 
the `ext4` file system, and the second partition (identified by UUID) should be mounted to `/disk2` as an `xfs` file system.

> Make sure to replace the UUID with the one that matches your system (you can check with `sudo blkid`).

```shell
/dev/sdb1     /disk1    ext4    defaults    0 2
UUID=dfe82aba-61a9-4b2d-b1a1-da009f3747ab /disk2   xfs     defaults    0 2
```

::: tip 💡 Hint
If your server was provisioned by Hetzner or another provider, you might see a default entry for a volume that no longer exists.
In that case, it’s best to comment out the line to prevent mount errors during boot:

```shell
#/dev/disk/by-id/scsi-0HC_Volume_102928062 /mnt/... xfs discard,nofail,defaults 0 0
```
:::

<Accordion title="Understanding the /etc/fstab Configuration">

The `/etc/fstab` file is a system configuration file on Linux that defines how and where different disk partitions and
storage devices should be mounted at boot time. Each line specifies a file system, its mount point, the type of file system, and various mount options.

In this example, the configuration includes the root partition, EFI boot partition, CD-ROM device, 
and two additional mounted partitions: one formatted as `ext4` and the other as `xfs`. It's important to keep this file accurate, as incorrect entries can prevent the system from booting properly.

```shell
  GNU nano 7.2                                           /etc/fstab                                                     # /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# systemd generates mount units based on this file, see systemd.mount(5).
# Please run 'systemctl daemon-reload' after making changes here.
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda3 during installation
UUID=95e9a239-3701-46a5-a3b6-c44d09664eef /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/sda2 during installation
UUID=E707-C5F3  /boot/efi       vfat    umask=0077      0       1
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0
#/dev/disk/by-id/scsi-0HC_Volume_102928062 /mnt/HC_Volume_102928062 xfs discard,nofail,defaults 0 0 <- must be removed
/dev/sdb1     /disk1    ext4    defaults    0 2
UUID=dfe82aba-61a9-4b2d-b1a1-da009f3747ab /disk2   xfs     defaults    0 2
```
</Accordion>

Once you’ve saved your changes to the file, you need to apply them.

First, inform the system to reload its configuration:
```shell
sudo systemctl daemon-reexec
```

Then, mount all filesystems defined in `/etc/fstab`:
```shell
sudo mount -a
```

If no errors appear, your new disks are successfully configured to auto-mount at every boot.

## Verify on Reboot

Once your `/etc/fstab` is properly configured, it’s important to test whether everything mounts correctly after a reboot. 
This ensures your system will behave as expected in the future—especially after reboots or crashes.

Restart the system to trigger the auto-mount process:

```shell
sudo reboot
```

After the system has come back online, log back in and verify that your new partitions are correctly mounted by running:

```shell
df -h
```

This will display an overview of all mounted filesystems, their sizes, and where they are mounted.
You should see something similar to this:

```shell
Filesystem      Size  Used Avail Use% Mounted on
udev            1.9G     0  1.9G   0% /dev
tmpfs           382M  680K  382M   1% /run
/dev/sda1        38G  1.3G   35G   4% /
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      241M  138K  241M   1% /boot/efi
tmpfs           382M     0  382M   0% /run/user/0
/dev/sdb1       4.9G   28K  4.6G   1% /disk1
/dev/sdb2       5.0G   68M  4.9G   2% /disk2
```

**Result**

If everything worked correctly:

- You’ll see both `/dev/sdb1` and `/dev/sdb2` listed.
- They will be mounted at `/disk1` and `/disk2`, respectively.
- This confirms that your `fstab` entries are working and that the partitions are automatically mounted at boot time.



## Prerequisites

- test
- test