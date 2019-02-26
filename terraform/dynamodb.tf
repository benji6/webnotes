resource "aws_dynamodb_table" "notes" {
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  name         = "webnotes_notes"
  range_key    = "date"

  attribute = {
    name = "date"
    type = "S"
  }

  attribute = {
    name = "userId"
    type = "S"
  }
}
