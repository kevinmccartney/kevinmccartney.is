resource "aws_route53_zone" "domain_routes" {
  name = "kevinmccartney.is"
  tags = {
    "project"    = "portfolio"
    "managed_by" = "terraform"
    "environment" = "global"
  }
}