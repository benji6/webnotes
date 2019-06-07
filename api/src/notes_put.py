import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  table.put_item(Item=event)
  return event
