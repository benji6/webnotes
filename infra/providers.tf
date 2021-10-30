terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "archive" {
  version = "~> 1.2.2"
}

provider "aws" {
  region = "us-east-1"
}
