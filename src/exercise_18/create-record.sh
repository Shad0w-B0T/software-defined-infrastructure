export HMAC=$(cat dnsupdate.sec)

nsupdate -y "$HMAC" <<EOF
server ns1.hdm-stuttgart.cloud
update add www.g3.sdi.hdm-stuttgart.cloud 10 A 157.180.78.55
send
EOF
