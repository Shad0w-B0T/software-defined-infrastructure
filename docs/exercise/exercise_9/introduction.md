# Enabling Index-Based File Search with plocate

This guide will demonstrate how to install and use the `plocate` tool to perform quick, index-based searches of files on a 
Linux system. The process involves installing the tool, indexing the file system, performing searches and observing the 
effect of file changes on search results.

## Install plocate

Begin by installing the plocate package:

```shell
sudo apt install plocate
```

## Create the initial index

Run the `updatedb` command to generate the initial file index:

```shell
sudo updatedb
```

This step creates the database that `locate` uses to find files.

## Search for files containing "aptitude"

Use the `locate` command to search for file paths that include the string `aptitude`:

```shell
root@debian-2gb-hel1-1:~# locate aptitude
/etc/alternatives/aptitude
/etc/alternatives/aptitude.8.gz
/etc/alternatives/aptitude.cs.8.gz
...
/var/log/aptitude
```

This shows that `locate` can quickly find all paths matching the search term from the index.

## Create a new test file

Now, create a new file that does not yet exist in the index:

```shell
touch ~/mylocaltest.txt
```

## Try searching before re-indexing
```shell
root@debian-2gb-hel1-1:~# locate localtest
root@debian-2gb-hel1-1:~# 
```

Nothing is found because the file was created after the last index update.

## Rebuild the index after create

Now update the file index again:
```shell
sudo updatedb
```

## Search again

```shell
root@debian-2gb-hel1-1:~# locate localtest
/root/mylocaltest.txt
```

The file is now found because it has been included in the latest index.

## Delete the file and search again

Remove the file:
```shell
root@debian-2gb-hel1-1:~# rm ~/mylocaltest.txt
root@debian-2gb-hel1-1:~# locate localtest
/root/mylocaltest.txt
```
The file still appears in search results because the index has not been updated yet.

## Rebuild the index and confirm deletion
````shell
root@debian-2gb-hel1-1:~# sudo updatedb
````

Now there should be no result, confirming the file was removed and the index is up to date.