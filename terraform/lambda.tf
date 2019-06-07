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

data "archive_file" "notes_post" {
  output_path = "../api/dist/notes_post.zip"
  source_file = "../api/src/notes_post.py"
  type        = "zip"
}

data "archive_file" "notes_put" {
  output_path = "../api/dist/notes_put.zip"
  source_file = "../api/src/notes_put.py"
  type        = "zip"
}

resource "aws_lambda_function" "notes_delete" {
  filename         = data.archive_file.notes_delete.output_path
  function_name    = "notes_delete"
  handler          = "notes_delete.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_delete.output_path)
}

resource "aws_lambda_function" "notes_get" {
  filename         = data.archive_file.notes_get.output_path
  function_name    = "notes_get"
  handler          = "notes_get.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_get.output_path)
}

resource "aws_lambda_function" "notes_put" {
  filename         = data.archive_file.notes_put.output_path
  function_name    = "notes_put"
  handler          = "notes_put.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_put.output_path)
}

resource "aws_lambda_function" "notes_post" {
  filename         = data.archive_file.notes_post.output_path
  function_name    = "notes_post"
  handler          = "notes_post.handler"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.7"
  source_code_hash = filebase64sha256(data.archive_file.notes_post.output_path)
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

resource "aws_lambda_permission" "notes_post" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.notes_post.arn
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

