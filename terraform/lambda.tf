data "archive_file" "notes_delete" {
  output_path = "../api/dist/notesDelete.zip"
  source_file = "../api/src/notesDelete.js"
  type        = "zip"
}

data "archive_file" "notes_get" {
  output_path = "../api/dist/notesGet.zip"
  source_file = "../api/src/notesGet.js"
  type        = "zip"
}

data "archive_file" "notes_post" {
  output_path = "../api/dist/notesPost.zip"
  source_file = "../api/src/notesPost.js"
  type        = "zip"
}

data "archive_file" "notes_put" {
  output_path = "../api/dist/notesPut.zip"
  source_file = "../api/src/notesPut.js"
  type        = "zip"
}

resource "aws_lambda_function" "notes_delete" {
  filename         = "${data.archive_file.notes_delete.output_path}"
  function_name    = "notesDelete"
  handler          = "notesDelete.handler"
  role             = "${aws_iam_role.lambda_exec.arn}"
  runtime          = "nodejs8.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.notes_delete.output_path}"))}"
}

resource "aws_lambda_function" "notes_get" {
  filename         = "${data.archive_file.notes_get.output_path}"
  function_name    = "notesGet"
  handler          = "notesGet.handler"
  role             = "${aws_iam_role.lambda_exec.arn}"
  runtime          = "nodejs8.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.notes_get.output_path}"))}"
}

resource "aws_lambda_function" "notes_put" {
  filename         = "${data.archive_file.notes_put.output_path}"
  function_name    = "notesPut"
  handler          = "notesPut.handler"
  role             = "${aws_iam_role.lambda_exec.arn}"
  runtime          = "nodejs8.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.notes_put.output_path}"))}"
}

resource "aws_lambda_function" "notes_post" {
  filename         = "${data.archive_file.notes_post.output_path}"
  function_name    = "notesPost"
  handler          = "notesPost.handler"
  role             = "${aws_iam_role.lambda_exec.arn}"
  runtime          = "nodejs8.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.notes_post.output_path}"))}"
}

resource "aws_lambda_permission" "notes_delete" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.notes_delete.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_get" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.notes_get.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_post" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.notes_post.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}

resource "aws_lambda_permission" "notes_put" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.notes_put.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.prod.execution_arn}/*/*"
  statement_id  = "AllowAPIGatewayInvoke"
}
