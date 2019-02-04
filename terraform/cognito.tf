resource "aws_cognito_user_pool" "main" {
  auto_verified_attributes = ["email"]
  name                     = "webnotes"
  username_attributes      = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name         = "webnotes"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

output "cognito_user_pool_id" {
  value = "${aws_cognito_user_pool.main.id}"
}

output "cognito_app_client_id" {
  value = "${aws_cognito_user_pool_client.main.id}"
}
