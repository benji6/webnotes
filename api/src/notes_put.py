import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  table.put_item(Item=event)
