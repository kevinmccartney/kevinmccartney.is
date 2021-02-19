resource "aws_route53_zone" "domain_routes" {
  name = "kevinmccartney.is"
  tags = {
    "project"     = "portfolio"
    "managed_by"  = "terraform"
    "environment" = "global"
  }
}

resource "aws_acm_certificate" "default" {
  domain_name               = "kevinmccartney.is"
  subject_alternative_names = ["*.kevinmccartney.is"]
  validation_method         = "DNS"
  tags = {
    "project"     = "portfolio"
    "managed_by"  = "terraform"
    "environment" = "global"
  }
  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "default" {
  depends_on = [aws_acm_certificate.default]

  for_each = {
    for dvo in aws_acm_certificate.default.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.domain_routes.zone_id
}

resource "aws_acm_certificate_validation" "default" {
  certificate_arn = aws_acm_certificate.default.arn

  validation_record_fqdns = [for record in aws_route53_record.default : record.fqdn]
}