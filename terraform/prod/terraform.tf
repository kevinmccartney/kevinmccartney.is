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
    lock_table = "portfolio-prod-state-locks"
    region     = var.portfolio_aws_region
    key        = "dev/terraform.tfstate"
  }
}

resource "aws_dynamodb_table" "terraform_state_locks" {
  name         = "portfolio-prod-state-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    "project"     = "portfolio"
    "managed_by"  = "terraform"
    "environment" = var.portfolio_env
  }
}


module "s3_dist" {
  source = "../modules/s3_distribution"

  environment = var.portfolio_env
}

