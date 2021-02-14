locals {
  bucket_name = var.environment == "prod" ? "kevinmccartney.is" : "dev.kevinmccartney.is"
}

# Pulling in cert & route zone from global module

data "aws_acm_certificate" "cert" {
  domain   = "kevinmccartney.is"
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "route_zone" {
  name = "kevinmccartney.is"
}

resource "aws_s3_bucket_policy" "dist_bucket" {
  bucket = aws_s3_bucket.web_dist.id

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${local.bucket_name}/*"
            ]
        }
    ]
}  
POLICY
}

resource "aws_s3_bucket" "web_dist" {
  bucket = local.bucket_name
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags = {
    "project"     = "portfolio",
    "managed_by"  = "terraform"
    "environment" = var.environment
  }
}

resource "aws_s3_bucket" "web_dist_www" {
  count = var.environment == "prod" ? 1 : 0

  bucket = "www.kevinmccartney.is"
  acl    = "public-read"

  website {
    redirect_all_requests_to = "https://kevinmccartney.is"
  }

  tags = {
    "project"     = "portfolio",
    "managed_by"  = "terraform"
    "environment" = var.environment
  }

  
}

resource "aws_route53_record" "s3_dist_record_dev" {
  count = var.environment == "dev" ? 1 : 0

  zone_id = data.aws_route53_zone.route_zone.zone_id
  name    = local.bucket_name
  type    = "A"
  
  alias {
    name = aws_cloudfront_distribution.s3_dist_dev[0].domain_name
    zone_id = aws_cloudfront_distribution.s3_dist_dev[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "s3_dist_record_prod" {
  count = var.environment == "prod" ? 1 : 0

  zone_id = data.aws_route53_zone.route_zone.zone_id
  name    = local.bucket_name
  type    = "A"
  
  alias {
    name = aws_cloudfront_distribution.s3_dist_prod[0].domain_name
    zone_id = aws_cloudfront_distribution.s3_dist_prod[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_redirect_record" {
  count = var.environment == "prod" ? 1 : 0

  zone_id = data.aws_route53_zone.route_zone.zone_id
  name    = "www.${local.bucket_name}"
  type    = "A"

  alias {
    name = aws_cloudfront_distribution.s3_dist_prod_www[0].domain_name
    zone_id = aws_cloudfront_distribution.s3_dist_prod_www[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "s3_dist_dev" {
  count = var.environment == "dev" ? 1 : 0

  origin {
    domain_name = aws_s3_bucket.web_dist.website_endpoint
    origin_id   = "portfolio-${var.environment}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  comment         = "Managed by Terraform"

  aliases = ["dev.kevinmccartney.is"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portfolio-${var.environment}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    "project"     = "portfolio",
    "managed_by"  = "terraform"
    "environment" = var.environment
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_cloudfront_distribution" "s3_dist_prod" {
  count = var.environment == "prod" ? 1 : 0
  origin {
    domain_name = aws_s3_bucket.web_dist.website_endpoint
    origin_id   = "portfolio-${var.environment}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  comment         = "Managed by Terraform"

  aliases = ["kevinmccartney.is"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portfolio-${var.environment}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    "project"     = "portfolio",
    "managed_by"  = "terraform"
    "environment" = var.environment
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_cloudfront_distribution" "s3_dist_prod_www" {
  count = var.environment == "prod" ? 1 : 0
  origin {
    domain_name = aws_s3_bucket.web_dist_www[0].website_endpoint
    origin_id   = "portfolio-www-${var.environment}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  comment         = "Managed by Terraform"

  aliases = ["www.kevinmccartney.is"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portfolio-www-${var.environment}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    "project"     = "portfolio",
    "managed_by"  = "terraform"
    "environment" = var.environment
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }
}