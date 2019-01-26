resource "aws_cloudfront_distribution" "site" {
  aliases             = ["${var.domain_name}", "*.${var.domain_name}"]
  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "${var.domain_name}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  origin {
    domain_name = "${aws_s3_bucket.site.bucket_domain_name}"
    origin_id   = "${var.domain_name}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.site.cloudfront_access_identity_path}"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.site.arn}"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_cloudfront_origin_access_identity" "site" {
  comment = "Origin Access Identity for S3"
}

output "cloudfront_domain_name" {
  value = "${aws_cloudfront_distribution.site.domain_name}"
}
