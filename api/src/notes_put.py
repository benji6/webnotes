import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  dateUpdated = datetime.now().isoformat()
  item = {
    'body': event['body'],
    'dateCreated': event['dateCreated'],
    'dateUpdated': dateUpdated,
    'userId': event['userId'],
  }
  table.put_item(Item=item)
  return item
