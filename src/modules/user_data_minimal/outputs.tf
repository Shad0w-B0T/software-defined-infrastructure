output "user_data_content" {
  description = "Rendered user_data content"
  value       = local_file.user_data.content
}
