terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 3.0"
  region  = var.portfolio_aws_region
}

data "terraform_remote_state" "state" {
  backend = "s3"
  config = {
    bucket     = "portfolio-state"
    lock_table = "portfolio-global-state-locks"
    region     = var.portfolio_aws_region
    key        = "global/terraform.tfstate"
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "portfolio-state"

  tags = {
    "project"     = "portfolio"
    "managed_by"  = "terraform"
    "environment" = "global"
  }
}

resource "aws_dynamodb_table" "terraform_state_locks" {
  name         = "portfolio-golbal-state-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    "project"     = "portfolio"
    "managed_by"  = "terraform"
    "environment" = "global"
  }
}

module "cert" {
  source = "./modules/cert"
}