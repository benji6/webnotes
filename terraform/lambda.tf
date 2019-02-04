data "archive_file" "notes" {
  type        = "zip"
  source_file = "../api/src/notes.js"
  output_path = "../api/dist/notes.zip"
}

resource "aws_lambda_function" "notes" {
  filename         = "${data.archive_file.notes.output_path}"
  function_name    = "notes"
  handler          = "notes.handler"
  role             = "${aws_iam_role.lambda_exec.arn}"
  runtime          = "nodejs8.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.notes.output_path}"))}"
}

resource "aws_lambda_permission" "api_gw" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.notes.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}
