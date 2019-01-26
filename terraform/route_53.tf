data "aws_route53_zone" "site" {
  name = "${var.domain_name}"
}

resource "aws_route53_record" "apex-a" {
  name    = "${var.domain_name}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.site.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
  }
}

resource "aws_route53_record" "apex-aaaa" {
  name    = "${var.domain_name}"
  type    = "AAAA"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.site.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
  }
}

resource "aws_route53_record" "api-a" {
  name    = "${aws_api_gateway_domain_name.api.domain_name}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_api_gateway_domain_name.api.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.api.regional_zone_id}"
  }
}

resource "aws_route53_record" "api-aaaa" {
  name    = "${aws_api_gateway_domain_name.api.domain_name}"
  type    = "AAAA"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_api_gateway_domain_name.api.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.api.regional_zone_id}"
  }
}

resource "aws_route53_record" "www-a" {
  name    = "www.${var.domain_name}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.site.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
  }
}

resource "aws_route53_record" "www-aaaa" {
  name    = "www.${var.domain_name}"
  type    = "AAAA"
  zone_id = "${data.aws_route53_zone.site.zone_id}"

  alias {
    evaluate_target_health = false
    name                   = "${aws_cloudfront_distribution.site.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
  }
}
