resource "aws_api_gateway_rest_api" "api" {
  name        = "WebnotesApi"
  description = "Webnotes API"
}

resource "aws_api_gateway_authorizer" "api" {
  name          = "WebnotesCognitoUserPoolAuthorizer"
  provider_arns = ["${aws_cognito_user_pool.main.arn}"]
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  type          = "COGNITO_USER_POOLS"
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = "${aws_api_gateway_rest_api.api.id}"
  domain_name = "${aws_api_gateway_domain_name.api.domain_name}"
  stage_name  = "${aws_api_gateway_deployment.prod.stage_name}"
}

resource "aws_api_gateway_domain_name" "api" {
  domain_name              = "api.${var.domain_name}"
  regional_certificate_arn = "${data.aws_acm_certificate.site.arn}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "notes" {
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "notes"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on = [
    "aws_api_gateway_integration.notes_delete",
    "aws_api_gateway_integration.notes_get",
    "aws_api_gateway_integration.notes_options",
    "aws_api_gateway_integration.notes_post",
    "aws_api_gateway_integration.notes_put",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "prod"
}

output "deploy_api_command" {
  value = "aws apigateway create-deployment --rest-api-id ${aws_api_gateway_rest_api.api.id} --stage-name prod"
}

output "api_gateway_url" {
  value = "${aws_api_gateway_deployment.prod.invoke_url}"
}
