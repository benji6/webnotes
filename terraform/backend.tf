terraform {
  backend "s3" {
    bucket = "webnotes-tfstate"
    key    = "data"
    region = "us-east-1"
  }
}
