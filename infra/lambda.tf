data "archive_file" "notes_delete" {
  output_path = "../api/dist/notes_delete.zip"
  source_file = "../api/src/notes_delete.py"
  type        = "zip"
}

data "archive_file" "notes_get" {
  output_path = "../api/dist/notes_get.zip"
  source_file = "../api/src/notes_get.py"
  type        = "zip"
}

data "archive_file" "notes_put" {
  output_path = "../api/dist/notes_put.zip"
  source_file = "../api/src/notes_put.py"
  type        = "zip"
}

resource "aws_lambda_function" "notes_delete" {
  filename         = data.archive_file.notes_delete.output_path
  function_name    = "WebnotesNotesDelete"
  handler          = "notes_delete.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_delete.output_path)
}

resource "aws_lambda_function" "notes_get" {
  filename         = data.archive_file.notes_get.output_path
  function_name    = "WebnotesNotesGet"
  handler          = "notes_get.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_get.output_path)
}

resource "aws_lambda_function" "notes_put" {
  filename         = data.archive_file.notes_put.output_path
  function_name    = "WebnotesNotesPut"
  handler          = "notes_put.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_put.output_path)
}

resource "aws_lambda_permission" "notes_delete" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_delete.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_get" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_get.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_put" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_put.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}
