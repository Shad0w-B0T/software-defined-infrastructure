locals {
  entries_map = {
    for entry in var.entries : entry.serverName => entry
  }
}

resource "local_file" "known_hosts" {
  for_each = local.entries_map

  content         = "${each.value.serverNameOrIp} ${each.value.serverHostPublicKey}"
  filename        = "${path.root}/gen/${each.key}/known_hosts"
  file_permission = "0644"
}

resource "local_file" "aggregate_known_hosts" {
  content = join("\n", [
    for key, entry in local.entries_map :
    "${entry.serverNameOrIp} ${entry.serverHostPublicKey}"
  ])

  filename        = "${path.root}/gen/known_hosts"
  file_permission = "0644"
}

resource "local_file" "ssh_script" {
  for_each = local.entries_map

  content = templatefile("${path.module}/tpl/ssh.sh", {
    ip        = each.value.serverNameOrIp,
    loginUser = each.value.loginUserName
    prefix    = each.key
  })

  filename        = "${path.root}/bin/ssh-${each.key}"
  file_permission = "0755"
}

resource "local_file" "scp_script" {
  for_each = local.entries_map

  content = templatefile("${path.module}/tpl/scp.sh", {
    ip        = each.value.serverNameOrIp,
    loginUser = each.value.loginUserName
    prefix    = each.key
  })

  filename        = "${path.root}/bin/scp-${each.key}"
  file_permission = "0755"
}
