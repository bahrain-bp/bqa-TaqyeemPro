import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')

def lambda_handler(event, context):
    try:
        body = event.get('body')
        if body and isinstance(body, str):
            body = json.loads(body)
        exam_id = body.get('examId') if body else None

        if not exam_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing examId in request body"})
            }

        table.delete_item(Key={'examId': exam_id})

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Exam deleted successfully"})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Error deleting exam", "error": str(e)})
        }
