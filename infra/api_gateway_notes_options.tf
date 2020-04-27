resource "aws_api_gateway_integration_response" "notes_options" {
  depends_on = [
    aws_api_gateway_integration.notes_options,
    aws_api_gateway_method_response.notes_options_200,
  ]

  http_method = aws_api_gateway_method.notes_options.http_method
  resource_id = aws_api_gateway_resource.notes.id
  rest_api_id = aws_api_gateway_rest_api.api.id
  status_code = aws_api_gateway_method_response.notes_options_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,GET,PATCH'"
    "method.response.header.Access-Control-Allow-Origin"  = var.access_control_allow_origin
  }
}

resource "aws_api_gateway_method_response" "notes_options_200" {
  depends_on  = [aws_api_gateway_method.notes_options]
  http_method = aws_api_gateway_method.notes_options.http_method
  resource_id = aws_api_gateway_resource.notes.id
  rest_api_id = aws_api_gateway_rest_api.api.id
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_method" "notes_options" {
  authorization = "NONE"
  http_method   = "OPTIONS"
  resource_id   = aws_api_gateway_resource.notes.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_integration" "notes_options" {
  http_method = aws_api_gateway_method.notes_options.http_method
  resource_id = aws_api_gateway_resource.notes.id
  rest_api_id = aws_api_gateway_rest_api.api.id
  type        = "MOCK"

  request_templates = {
    "application/json" = "{ \"statusCode\": 200 }"
  }
}
