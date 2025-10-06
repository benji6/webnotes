data "archive_file" "notes_get" {
  output_path = "../api/dist/notes_get.zip"
  source_file = "../api/src/notes_get.py"
  type        = "zip"
}

data "archive_file" "notes_patch" {
  output_path = "../api/dist/notes_patch.zip"
  source_file = "../api/src/notes_patch.py"
  type        = "zip"
}

resource "aws_lambda_function" "notes_get" {
  filename                       = data.archive_file.notes_get.output_path
  function_name                  = "WebnotesNotesGet"
  handler                        = "notes_get.handler"
  role                           = aws_iam_role.lambda_notes_get.arn
  runtime                        = "python3.11"
  source_code_hash               = filebase64sha256(data.archive_file.notes_get.output_path)
  reserved_concurrent_executions = 8
}

resource "aws_lambda_function" "notes_patch" {
  filename                       = data.archive_file.notes_patch.output_path
  function_name                  = "WebnotesNotesPatch"
  handler                        = "notes_patch.handler"
  role                           = aws_iam_role.lambda_notes_patch.arn
  runtime                        = "python3.11"
  source_code_hash               = filebase64sha256(data.archive_file.notes_patch.output_path)
  reserved_concurrent_executions = 8
}

resource "aws_lambda_permission" "notes_get" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_get.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_patch" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_patch.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}
