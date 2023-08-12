variable "environment" {
  type        = string
  description = "The environment we are working on"
}

variable "ses_domain" {
  type        = string
  description = "The domain for SES"
}

variable "domain_zone_id" {
  type        = string
  description = "The domain id for the route53 zone"
}

variable "aws_region" {
  type        = string
  description = "The AWS region we're working in"
}