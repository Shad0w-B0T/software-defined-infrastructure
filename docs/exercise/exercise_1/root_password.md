# Root Access & Password Management

If **no SSH key** is provided during server creation, Hetzner automatically generates a root password. This password is sent **via email** to the **owner of the organization** associated with the Hetzner Cloud account.

To manage or reset the root password manually, follow these steps:

1. Open the server details in the Hetzner Cloud Console.
2. Navigate to the **Rescue** tab.
3. Click on **Reset Root Password** to generate a new one.

<ImageWithCaption
  src="./root_password_1.png"
  alt="Server UI"
  :caption="'Location of the root password reset option in the Hetzner interface'"
  :number="1"
/>

After clicking **Reset Root Password**, a new password will be generated and displayed in the panel:

<ImageWithCaption
  src="./root_password_2.png"
  alt="Server UI"
  :caption="'The newly generated root password is shown here after reset'"
  :number="2"
/>