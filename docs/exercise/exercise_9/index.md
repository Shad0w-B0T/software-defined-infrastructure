# Enabling Index-Based File Search with plocate

This guide will demonstrate how to install and use the `plocate` tool to perform quick, index-based searches of files on a 
Linux system. The process involves installing the tool, indexing the file system, performing searches and observing the 
effect of file changes on search results.

## 1. Install plocate

Begin by installing the plocate package:

```shell
sudo apt install plocate
```

## 2. Create the initial index

Run the `updatedb` command to generate the initial file index:

```shell
sudo updatedb
```

This step creates the database that `locate` uses to find files.

## 3. Search for files containing "aptitude"

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

## 4. Create a new test file

Now, create a new file that does not yet exist in the index:

```shell
touch ~/mylocaltest.txt
```

## 5. Try searching before re-indexing
```shell
root@debian-2gb-hel1-1:~# locate localtest
root@debian-2gb-hel1-1:~# 
```

Nothing is found because the file was created after the last index update.

## 6. Rebuild the index after create

Now update the file index again:
```shell
sudo updatedb
```

## 7. Search again

```shell
root@debian-2gb-hel1-1:~# locate localtest
/root/mylocaltest.txt
```

The file is now found because it has been included in the latest index.

## 8. Delete the file and search again

Remove the file:
```shell
root@debian-2gb-hel1-1:~# rm ~/mylocaltest.txt
root@debian-2gb-hel1-1:~# locate localtest
/root/mylocaltest.txt
```
The file still appears in search results because the index has not been updated yet.

## 9. Rebuild the index and confirm deletion
````shell
root@debian-2gb-hel1-1:~# sudo updatedb
````

Now there should be no result, confirming the file was removed and the index is up to date.