resource "local_file" "known_hosts" {
  content         = "${var.serverNameOrIp} ${var.serverHostPublicKey}"
  filename        = "${path.root}/gen/known_hosts"
  file_permission = "0644"
}

resource "local_file" "ssh_script" {
  content         = templatefile("${path.module}/tpl/ssh.sh", {
    ip        = var.serverNameOrIp,
    loginUser = var.loginUserName
  })
  filename        = "${path.root}/bin/ssh"
  file_permission = "0755"
  depends_on      = [local_file.known_hosts]
}

resource "local_file" "scp_script" {
  content         = templatefile("${path.module}/tpl/scp.sh", {
    ip        = var.serverNameOrIp,
    loginUser = var.loginUserName
  })
  filename        = "${path.root}/bin/scp"
  file_permission = "0755"
  depends_on      = [local_file.known_hosts]
}
