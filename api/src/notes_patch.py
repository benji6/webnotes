import json

import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("webnotes_notes")


def handler(event, context):
    user_id = event["requestContext"]["authorizer"]["claims"]["sub"]
    try:
        patch = json.loads(event["body"])
        with table.batch_writer() as batch:
            if "delete" in patch:
                for id in patch["delete"]:
                    batch.delete_item(Key={"dateCreated": id, "userId": user_id})
            if "put" in patch:
                for note in patch["put"]:
                    note["userId"] = user_id
                    batch.put_item(Item=note)
        return {"statusCode": 204}
    except Exception as e:
        print(e)
        return {
            "body": "Internal server error",
            "statusCode": 500,
        }
