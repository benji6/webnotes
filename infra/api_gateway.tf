resource "aws_api_gateway_rest_api" "api" {
  name        = "WebnotesApi"
  description = "Webnotes API"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_authorizer" "api" {
  name          = "WebnotesCognitoUserPoolAuthorizer"
  provider_arns = [aws_cognito_user_pool.main.arn]
  rest_api_id   = aws_api_gateway_rest_api.api.id
  type          = "COGNITO_USER_POOLS"
}

resource "aws_api_gateway_request_validator" "api" {
  name                        = "WebnotesRequestValidator"
  rest_api_id                 = aws_api_gateway_rest_api.api.id
  validate_request_body       = true
  validate_request_parameters = true
}

resource "aws_api_gateway_resource" "notes" {
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "notes"
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on = [
    aws_api_gateway_integration.notes_get,
    aws_api_gateway_integration.notes_patch,
  ]

  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"

  lifecycle {
    create_before_destroy = true
  }
}

output "deploy_api_command" {
  value = "aws apigateway create-deployment --rest-api-id ${aws_api_gateway_rest_api.api.id} --stage-name prod"
}

output "api_gateway_url" {
  value = aws_api_gateway_deployment.prod.invoke_url
}
