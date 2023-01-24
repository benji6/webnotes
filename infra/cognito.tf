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

  verification_message_template {
    default_email_option  = "CONFIRM_WITH_LINK"
    email_message_by_link = "Welcome to Webnotes! You're almost signed up, just {##follow this link to verify your email address##}, then go back to the app and sign in!"
    email_subject_by_link = "Webnotes email verification"
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name                          = "webnotes"
  prevent_user_existence_errors = "ENABLED"
  refresh_token_validity        = 365 # max value in days
  user_pool_id                  = aws_cognito_user_pool.main.id
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "webnotes"
  user_pool_id = aws_cognito_user_pool.main.id
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_app_client_id" {
  value = aws_cognito_user_pool_client.main.id
}
