resource "local_file" "user_data" {
  content = templatefile("${path.module}/tpl/userData.yml", {
    loginUser        = var.login_user
    ssh_public_key   = var.ssh_public_key
    host_private_key = indent(4, var.host_private_key)
    host_public_key  = var.host_public_key
  })

  filename = "${path.root}/gen/userData.yml"
}
