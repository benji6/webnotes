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

resource "aws_api_gateway_method" "get_notes" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method" "notes_options" {
  authorization = "NONE"
  http_method   = "OPTIONS"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method" "notes_post" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = "${aws_api_gateway_authorizer.api.id}"
  http_method   = "POST"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method_response" "notes_options_200" {
  depends_on  = ["aws_api_gateway_method.notes_options"]
  http_method = "${aws_api_gateway_method.notes_options.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = 200

  response_models {
    "application/json" = "Empty"
  }

  response_parameters {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration" "notes" {
  http_method             = "${aws_api_gateway_method.get_notes.http_method}"
  integration_http_method = "POST"
  resource_id             = "${aws_api_gateway_resource.notes.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.notes.invoke_arn}"
}

resource "aws_api_gateway_integration" "notes_options" {
  http_method = "${aws_api_gateway_method.notes_options.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  type        = "MOCK"

  request_templates {
    "application/json" = "{ \"statusCode\": 200 }"
  }
}

resource "aws_api_gateway_integration" "notes_post" {
  http_method             = "${aws_api_gateway_method.notes_post.http_method}"
  integration_http_method = "POST"
  resource_id             = "${aws_api_gateway_resource.notes.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.notes_post.invoke_arn}"
}

resource "aws_api_gateway_integration_response" "notes_options" {
  http_method = "${aws_api_gateway_method.notes_options.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = "${aws_api_gateway_method_response.notes_options_200.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS,GET,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [
    "aws_api_gateway_integration.notes_options",
    "aws_api_gateway_method_response.notes_options_200",
  ]
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on = [
    "aws_api_gateway_integration.notes",
    "aws_api_gateway_integration.notes_options",
    "aws_api_gateway_integration.notes_post",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "prod"
}

output "api_gateway_url" {
  value = "${aws_api_gateway_deployment.prod.invoke_url}"
}
