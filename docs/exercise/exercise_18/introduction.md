# DNS & Web Server Configuration

## Objective

Set DNS **A records** for your group domain and configure your web server to serve content under:

- http://g3.sdi.hdm-stuttgart.cloud
- http://www.g3.sdi.hdm-stuttgart.cloud

## Export the HMAC Key

Before sending DNS updates, export the group-specific HMAC key:

```bash
export HMAC="hmac-sha512:..."
```

## Create DNS A Records

Use `nsupdate` to add A records for your group domain pointing to your server’s public IP address:

**Example server IP:** `168.119.226.35`

Run `nsupdate`:
```bash
nsupdate -y "$HMAC"
```

Inside the interactive session, enter:

```text
> server ns1.hdm-stuttgart.cloud
> update add www.g3.sdi.hdm-stuttgart.cloud 10 A 168.119.226.35  # Replace with your ip
> update add g3.sdi.hdm-stuttgart.cloud 10 A 168.119.226.35 # Replace with your ip
> send
> quit
```

## Verify DNS Entries

Check both records using `dig`:

```bash
dig +noall +answer @ns1.hdm-stuttgart.cloud www.g3.sdi.hdm-stuttgart.cloud
dig +noall +answer @ns1.hdm-stuttgart.cloud g3.sdi.hdm-stuttgart.cloud
```

Expected Output:

```bash
www.g3.sdi.hdm-stuttgart.cloud. 10 IN A 168.119.226.35
g3.sdi.hdm-stuttgart.cloud.     10 IN A 168.119.226.35
```

## Set Web Page Content

Update the default web page to return a custom message:

```bash
echo "<h1>Hello from g3.sdi.hdm-stuttgart.cloud</h1>" | sudo tee /var/www/html/index.html
```

## Access Your Web Server

Once DNS propagation is complete, you should be able to access:

- http://g3.sdi.hdm-stuttgart.cloud
- http://www.g3.sdi.hdm-stuttgart.cloud

<ImageWithCaption src="/images/exercise_18/web_url.png" alt="URL resolves correctly to server via HTTP (port 80)" :caption="'The domain g3.sdi.hdm-stuttgart.cloud resolves correctly'" :number="1" />

## Remove DNS Records (Optional)

To delete the previously added records:

```bash
nsupdate -y "$HMAC"
```

Then enter:

```text
> server ns1.hdm-stuttgart.cloud
> update delete www.g3.sdi.hdm-stuttgart.cloud A
> update delete g3.sdi.hdm-stuttgart.cloud A
> send
> quit
```

## Notes

- TTL is set to 10 seconds to allow quick propagation.
- Use @ns1.hdm-stuttgart.cloud to query the authoritative server directly.
