resource "aws_dynamodb_table" "notes" {
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  name         = "webnotes_notes"

  attribute = {
    name = "id"
    type = "S"
  }
}
