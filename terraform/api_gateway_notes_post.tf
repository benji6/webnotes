resource "aws_api_gateway_integration" "notes_post" {
  http_method             = "${aws_api_gateway_method.notes_post.http_method}"
  integration_http_method = "POST"

  request_templates = {
    "application/json" = <<EOF
{
  "body": $input.json('$.body'),
  "userId": "$context.authorizer.claims.sub"
}
EOF
  }

  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  type        = "AWS"
  uri         = "${aws_lambda_function.notes_post.invoke_arn}"
}

resource "aws_api_gateway_integration_response" "notes_post_200" {
  depends_on = [
    "aws_api_gateway_integration.notes_post",
    "aws_api_gateway_method_response.notes_post_200",
  ]

  http_method = "${aws_api_gateway_method.notes_post.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "${var.access_control_allow_origin}"
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = "${aws_api_gateway_method_response.notes_post_200.status_code}"
}

resource "aws_api_gateway_integration_response" "notes_post_500" {
  depends_on = [
    "aws_api_gateway_integration.notes_post",
    "aws_api_gateway_method_response.notes_post_500",
  ]

  http_method = "${aws_api_gateway_method.notes_post.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "${var.access_control_allow_origin}"
  }

  rest_api_id       = "${aws_api_gateway_rest_api.api.id}"
  selection_pattern = "[^0-9](.|\n)*"
  status_code       = "${aws_api_gateway_method_response.notes_post_500.status_code}"
}

resource "aws_api_gateway_method" "notes_post" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = "${aws_api_gateway_authorizer.api.id}"
  http_method   = "POST"

  request_models = {
    "application/json" = "${aws_api_gateway_model.notes_post.name}"
  }

  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method_response" "notes_post_200" {
  depends_on  = ["aws_api_gateway_method.notes_post"]
  http_method = "${aws_api_gateway_method.notes_post.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = 200
}

resource "aws_api_gateway_method_response" "notes_post_500" {
  depends_on  = ["aws_api_gateway_method.notes_post"]
  http_method = "${aws_api_gateway_method.notes_post.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = 500
}

resource "aws_api_gateway_model" "notes_post" {
  content_type = "application/json"
  name         = "notespost"
  rest_api_id  = "${aws_api_gateway_rest_api.api.id}"

  schema = <<EOF
{
  "properties": {
    "body": { "type": "string" }
  },
  "required": ["body"],
  "type": "object"
}
EOF
}
