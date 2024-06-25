resource "aws_dynamodb_table" "notes" {
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  name         = "webnotes_notes"
  range_key    = "dateCreated"

  attribute {
    name = "dateCreated"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }
}

