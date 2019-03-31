resource "aws_api_gateway_integration" "notes_post" {
  http_method             = "${aws_api_gateway_method.notes_post.http_method}"
  integration_http_method = "POST"
  resource_id             = "${aws_api_gateway_resource.notes.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.notes_post.invoke_arn}"
}

resource "aws_api_gateway_method" "notes_post" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = "${aws_api_gateway_authorizer.api.id}"
  http_method   = "POST"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}
