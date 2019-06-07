resource "aws_iam_role" "lambda_exec" {
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


  name = "lambda_exec"
}

resource "aws_iam_policy" "lambda_policy" {
  name = "lambda_policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "dynamodb:*",
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.notes.arn}"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
policy_arn = aws_iam_policy.lambda_policy.arn
role       = aws_iam_role.lambda_exec.name
}

resource "aws_iam_role_policy_attachment" "aws_lambda_basic_execution_role_attachment" {
policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
role       = aws_iam_role.lambda_exec.name
}

