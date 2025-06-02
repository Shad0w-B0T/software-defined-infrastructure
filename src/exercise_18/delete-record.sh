nsupdate -y "$HMAC" <<EOF
server ns1.hdm-stuttgart.cloud
update delete www.g3.sdi.hdm-stuttgart.cloud A 141.62.75.114
send
EOF
