# Listing All IP Addresses

To view all IP addresses associated with your servers:

1. Navigate to **Servers** in the Hetzner Cloud Console.
2. Select **Primary IPs** from the menu.

<ImageWithCaption
  src="./list_1.png"
  alt="Server UI"
  :caption="'Overview of all assigned and unassigned IP addresses'"
  :number="1"
/>

Here, you will see a complete list of both used and unused IP addresses.

- IP addresses marked as **"All delete →"** indicate that both an IPv4 and an IPv6 address are still assigned to an owner.
- Please note that all assigned IPs, even unused ones, incur costs as long as they are reserved.

Make sure to release any IP addresses you no longer need to avoid unnecessary charges.
