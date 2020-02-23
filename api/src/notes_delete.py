import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('webnotes_notes')

def handler(event, context):
  table.delete_item(
    Key={
      'dateCreated': event['dateCreated'],
      'userId': event['userId'],
    }
  )
