# Your first Server

In this section, you will walk through the process of creating your first virtual server using the **Hetzner Cloud Console**.

From choosing a region to assigning a firewall, each step ensures that your server is correctly configured and securely deployed.

<ImageWithCaption
  src="/images/exercise_1/server_1.png"
  alt="Server UI"
  :caption="'Server-Creation via the Hetzner-Panel.'"
  :number="1"
/>

## 1. Choose a Location

Select a data center near your users or your own location for optimal latency.

<ImageWithCaption
  src="/images/exercise_1/server_2.png"
  alt="Server UI"
  :caption="'Selecting the server location in the Hetzner Cloud Console.'"
  :number="2"
/>

## 2. Select the Operating System

Choose from various Linux distributions or images. Debian 12 is a solid choice for most use cases.

<ImageWithCaption
  src="/images/exercise_1/server_3.png"
  alt="Server UI"
  :caption="'Selecting an OS image for the server.'"
  :number="3"
/>

## 3. Choose Server Type

Pick a server type based on your workload — CX22 is great for testing and small apps.

<ImageWithCaption
  src="/images/exercise_1/server_4.png"
  alt="Server UI"
  :caption="'Choosing the server type (CPU, RAM, Disk).'"
  :number="4"
/>

## 4. Networking Options

Set up networking features like private networks, public IPs, and floating IPs.

<ImageWithCaption
  src="/images/exercise_1/server_5.png"
  alt="Server UI"
  :caption="'Configuring networking options for your server.'"
  :number="5"
/>

## 5. Assign a Firewall

Attach a previously created firewall to protect your server.

<ImageWithCaption
  src="/images/exercise_1/server_6.png"
  alt="Server UI"
  :caption="'Attaching a firewall to limit incoming traffic.'"
  :number="6"
/>

## 6. Set a Server Name

Give your server a meaningful name (e.g. `web-node-1`) for easier identification.

<ImageWithCaption
  src="/images/exercise_1/server_7.png"
  alt="Server UI"
  :caption="'Naming your server for easier management later.'"
  :number="7"
/>

Once all options are configured, confirm your choices and create the server.

<ImageWithCaption
  src="/images/exercise_1/server_8.png"
  alt="Overview and confirmation"
  :caption="'Review all options before creating the server.'"
  :number="8"
/>

After a few seconds, your server will be deployed and ready to use!
