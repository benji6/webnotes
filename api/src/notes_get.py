import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  response = table.query(KeyConditionExpression=Key('userId').eq(event['userId']))
  return sorted(response['Items'], key=lambda x: x['dateUpdated'], reverse=True)
