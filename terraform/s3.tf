resource "aws_s3_bucket" "site" {
  bucket = "${var.domain_name}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "s3:GetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "${aws_cloudfront_origin_access_identity.site.iam_arn}"
      },
      "Resource": "arn:aws:s3:::${var.domain_name}/*"
    }
  ]
}
EOF
}
