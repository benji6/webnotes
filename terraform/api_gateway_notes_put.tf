resource "aws_api_gateway_integration" "notes_put" {
  http_method             = "${aws_api_gateway_method.notes_put.http_method}"
  integration_http_method = "POST"
  resource_id             = "${aws_api_gateway_resource.notes.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.notes_put.invoke_arn}"
}

resource "aws_api_gateway_method" "notes_put" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = "${aws_api_gateway_authorizer.api.id}"
  http_method   = "PUT"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}
