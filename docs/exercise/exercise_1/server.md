# Your first Server

In this section, you will walk through the process of creating your first virtual server using the **Hetzner Cloud Console**.

From choosing a region to assigning a firewall, each step ensures that your server is correctly configured and securely deployed.

<ImageWithCaption
  src="./server_1.png"
  alt="Server UI"
  :caption="'Server-Erstellung im Hetzner-Panel'"
  :number="5"
/>

## 1. Choose a Location

Select a data center near your users or your own location for optimal latency.

<ImageWithCaption
  src="./server_2.png"
  alt="Server UI"
  :caption="'Selecting the server location in the Hetzner Cloud Console.'"
  :number="6"
/>

## 2. Select the Operating System

Choose from various Linux distributions or images. Debian 12 is a solid choice for most use cases.

<ImageWithCaption
  src="./server_3.png"
  alt="Server UI"
  :caption="'Selecting an OS image for the server.'"
  :number="7"
/>

## 3. Choose Server Type

Pick a server type based on your workload — CX22 is great for testing and small apps.

<ImageWithCaption
  src="./server_4.png"
  alt="Server UI"
  :caption="'Choosing the server type (CPU, RAM, Disk).'"
  :number="8"
/>

## 4. Networking Options

Set up networking features like private networks, public IPs, and floating IPs.

<ImageWithCaption
  src="./server_5.png"
  alt="Server UI"
  :caption="'Configuring networking options for your server.'"
  :number="9"
/>

## 5. Assign a Firewall

Attach a previously created firewall to protect your server.

<ImageWithCaption
  src="./server_6.png"
  alt="Server UI"
  :caption="'Attaching a firewall to limit incoming traffic.'"
  :number="10"
/>

## 6. Set a Server Name

Give your server a meaningful name (e.g. `web-node-1`) for easier identification.

<ImageWithCaption
  src="./server_7.png"
  alt="Server UI"
  :caption="'Naming your server for easier management later.'"
  :number="11"
/>

Once all options are configured, confirm your choices and create the server.

<ImageWithCaption
  src="./server_8.png"
  alt="Overview and confirmation"
  :caption="'Review all options before creating the server.'"
  :number="12"
/>

After a few seconds, your server will be deployed and ready to use!
