resource "aws_api_gateway_integration" "notes_delete" {
  http_method             = "${aws_api_gateway_method.notes_delete.http_method}"
  integration_http_method = "POST"

  request_templates = {
    "application/json" = <<EOF
{
  "dateCreated": $input.json('$.dateCreated'),
  "userId": "$context.authorizer.claims.sub"
}
EOF
  }

  resource_id = "${aws_api_gateway_resource.notes.id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  type        = "AWS"
  uri         = "${aws_lambda_function.notes_delete.invoke_arn}"
}

resource "aws_api_gateway_integration_response" "notes_delete_200" {
  depends_on = [
    "aws_api_gateway_integration.notes_delete",
    "aws_api_gateway_method_response.notes_delete_200",
  ]

  http_method = "${aws_api_gateway_method.notes_delete.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "${var.access_control_allow_origin}"
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = "${aws_api_gateway_method_response.notes_delete_200.status_code}"
}

resource "aws_api_gateway_integration_response" "notes_delete_500" {
  depends_on = [
    "aws_api_gateway_integration.notes_delete",
    "aws_api_gateway_method_response.notes_delete_500",
  ]

  http_method = "${aws_api_gateway_method.notes_delete.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "${var.access_control_allow_origin}"
  }

  rest_api_id       = "${aws_api_gateway_rest_api.api.id}"
  selection_pattern = "[^0-9](.|\n)*"
  status_code       = "${aws_api_gateway_method_response.notes_delete_500.status_code}"
}

resource "aws_api_gateway_method" "notes_delete" {
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = "${aws_api_gateway_authorizer.api.id}"
  http_method   = "DELETE"
  resource_id   = "${aws_api_gateway_resource.notes.id}"
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method_response" "notes_delete_200" {
  depends_on  = ["aws_api_gateway_method.notes_delete"]
  http_method = "${aws_api_gateway_method.notes_delete.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = 200
}

resource "aws_api_gateway_method_response" "notes_delete_500" {
  depends_on  = ["aws_api_gateway_method.notes_delete"]
  http_method = "${aws_api_gateway_method.notes_delete.http_method}"
  resource_id = "${aws_api_gateway_resource.notes.id}"

  response_parameters {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  status_code = 500
}
