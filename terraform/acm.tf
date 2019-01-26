data "aws_acm_certificate" "site" {
  domain = "${var.domain_name}"
}
