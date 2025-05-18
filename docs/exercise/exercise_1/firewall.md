# Create Firewall

Before launching a server, it’s essential to define a **firewall** to protect it from unwanted access.
A firewall controls which traffic is allowed to reach your server. We'll now configure one in the Hetzner web interface.

## 1. Open the Firewall Tab

☰ Networking → Firewalls → Create Firewall

Select Firewalls → Create Firewall.

<ImageWithCaption
  src="./firewall_1.png"
  alt="Server UI"
  :caption="'Navigating to firewall creation in the Hetzner Console.'"
  :number="1"
/>

## 2. Create a New Firewall

Click on Create Firewall and adjust the settings to your needs.

<ImageWithCaption
  src="./firewall_2.png"
  alt="Server UI"
  :caption="'Customizing rules for your new firewall.'"
  :number="2"
/>

::: tip 💡 SSH & ICMP
Keep the two default inbound rules:

   - Port 22 (SSH) for remote server access
   - ICMP (Ping) for connectivity checks

These are essential for server management.
:::

## 3. Name Your Firewall

Choose a descriptive name like basic-firewall so you can reuse it easily for other servers.

<ImageWithCaption
  src="./firewall_3.png"
  alt="Server UI"
  :caption="'Naming the firewall for easier identification.'"
  :number="3"
/>

You can either accept the default name or set it to something meaningful, like basicFirewall, to easily identify it later.

## 4. Done

Once you’re done configuring, click Create.

<ImageWithCaption
  src="./firewall_4.png"
  alt="Server UI"
  :caption="'The firewall is now ready for use and can be assigned to any server.'"
  :number="4"
/>

You ’ve now created a reusable firewall configuration that can be assigned to any cloud server you launch.
This improves both security and consistency in your infrastructure setup.

In the next step, you’ll launch the actual cloud server using this firewall.
