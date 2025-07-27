# Step-by-Step

## Objective

After applying your Terraform configuration, the following HTTPS endpoints should be available and serve th

> https://g3.sdi.hdm-stuttgart.cloud

> https://www.g3.sdi.hdm-stuttgart.cloud

> https://mail.g3.sdi.hdm-stuttgart.cloud

## Expected Result

Once the server is up and running with the certificate correctly configured in Nginx, accessing the URLs listed above in a browser should show the certificate in use.


### Certificate (Staging Environment)

The certificate is issued by Let's Encrypt **staging** environment.
This version is used for testing and may result in browser warnings.

<ImageWithCaption  
src="/images/exercise_24/cert_staging.png"  
alt="Staging Certificate"  
:caption="'Staging Certificate in Browser'"  
:number="1"  
/>

<ImageWithCaption  
src="/images/exercise_24/cert_staging_overview.png"  
alt="Staging Certificate Overview"  
:caption="'Staging Certificate in Browser Overview'"  
:number="2"  
/>

### Certificate (Production Environment)

The certificate is now issued by Let's Encrypt **production** environment.
This is a valid certificate and should be accepted by all modern browsers without warnings.
The issuing chain ends in the **R10 Intermediate CA**, which chains to **ISRG Root X1**. ([R10](/exercise/exercise_23/r10.html))

<ImageWithCaption  
src="/images/exercise_24/cert_production.png"  
alt="Production Certificate"  
:caption="'Production Certificate in Browser'"  
:number="3"  
/>

<ImageWithCaption  
src="/images/exercise_24/cert_production_overview.png"  
alt="Production Certificate Overview"  
:caption="'Production Certificate in Browser Overview'"  
:number="4"  
/>


## Notes

- Certificate generation should happen **before** provisioning the server, so that the resulting `certificate.pem` and `private.pem` can be uploaded.
- Nginx should be automatically configured to serve traffic via HTTPS using these certificate files.
- Ensure DNS records for all three subdomains exist and point to the server IP.
- You can use Terraform provisioners or user data (`cloud-init`) to install and configure Nginx during server creation.


## Verification Steps

1. Open a browser and visit each of the URLs.
2. Check that the connection is secure (🔒).
3. Inspect the certificate details to verify:
    - Issuer is **Let's Encrypt**
    - Subject includes the expected domain (e.g., `*.g3.sdi.hdm-stuttgart.cloud`)
    - Certificate chain includes **R10** → **ISRG Root X1**

This setup combines infrastructure provisioning with secure certificate management,
enabling a production-ready HTTPS deployment with one `terraform apply`.