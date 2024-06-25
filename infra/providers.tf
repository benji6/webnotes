terraform {
  required_providers {
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  default_tags {
    tags = {
      Application = "Webnotes"
    }
  }

  region = "us-east-1"
}
