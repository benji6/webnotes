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
    email_message_by_link = "{##Follow this link##} to complete your signup with Webnotes"
    email_subject_by_link = "Webnotes email verification"
  }
}

resource "aws_cognito_user_pool_client" "main" {
  name         = "webnotes"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "webnotes"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id     = "${aws_cognito_user_pool_client.main.id}"
    provider_name = "${aws_cognito_user_pool.main.endpoint}"
  }
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "webnotes"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

output "cognito_user_pool_id" {
  value = "${aws_cognito_user_pool.main.id}"
}

output "cognito_app_client_id" {
  value = "${aws_cognito_user_pool_client.main.id}"
}
