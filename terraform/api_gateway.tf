resource "aws_api_gateway_rest_api" "api" {
  name        = "WebnotesApi"
  description = "Webnotes API"
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

resource "aws_api_gateway_integration" "notes" {
  http_method             = "${aws_api_gateway_method.get_notes.http_method}"
  integration_http_method = "POST"
  resource_id             = "${aws_api_gateway_resource.notes.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.notes.invoke_arn}"
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on  = ["aws_api_gateway_integration.notes"]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "prod"
}

output "api_gateway_url" {
  value = "${aws_api_gateway_deployment.prod.invoke_url}"
}
