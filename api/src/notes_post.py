import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  date = datetime.now().isoformat()
  item = {
    'body': event['body'],
    'dateCreated': date,
    'dateUpdated': date,
    'userId': event['userId'],
  }
  table.put_item(Item=item)
  return item
