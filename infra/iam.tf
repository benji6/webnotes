resource "aws_iam_role" "lambda_notes_get" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      }
    }
  ]
}
EOF


  name = "webnotes_lambda_notes_get"
}

resource "aws_iam_policy" "lambda_notes_get" {
  name = "webnotes_lambda_notes_get_policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "dynamodb:Query",
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.notes.arn}"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "lambda_notes_get_dynamo" {
  policy_arn = aws_iam_policy.lambda_notes_get.arn
  role       = aws_iam_role.lambda_notes_get.name
}

resource "aws_iam_role_policy_attachment" "lambda_notes_get_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_notes_get.name
}

resource "aws_iam_role" "lambda_notes_patch" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      }
    }
  ]
}
EOF


  name = "webnotes_lambda_notes_patch"
}

resource "aws_iam_policy" "lambda_notes_patch" {
  name = "webnotes_lambda_notes_patch_policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "dynamodb:BatchWriteItem",
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.notes.arn}"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "lambda_notes_patch_dyanmo" {
  policy_arn = aws_iam_policy.lambda_notes_patch.arn
  role       = aws_iam_role.lambda_notes_patch.name
}

resource "aws_iam_role_policy_attachment" "lambda_notes_patch_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_notes_patch.name
}
