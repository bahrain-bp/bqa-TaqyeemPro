import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')

def lambda_handler(event, context):
    # CORS headers to be used in all responses
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
    }

    # Handle preflight CORS request
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "CORS preflight success"})
        }

    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))

        title = body.get('examTitle', '').strip()
        description = body.get('examDescription', '').strip()
        subject = body.get('subject', '').strip()
        grade = int(body.get('grade', 0))
        language = body.get('language', '').strip()
        active_input = body.get('active', 'No').strip().lower()
        is_active = active_input == 'yes'
        duration = int(body.get('duration', 0))
        questions = body.get('questions', [])

        # Basic validation
        if not title or not subject or not grade or not language or not questions:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Missing required exam fields"})
            }

        # Generate unique exam ID
        exam_id = str(uuid.uuid4())

        # Prepare the item for DynamoDB
        item = {
            "examId": exam_id,
            "examTitle": title,
            "examDescription": description,
            "subject": subject,
            "grade": grade,
            "language": language,
            "duration": duration,
            "isActive": is_active,
            "questions": questions,
            "creationDate": datetime.utcnow().isoformat()
        }

        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Exam created successfully",
                "examId": exam_id
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "error": "Internal server error",
                "details": str(e)
            })
        }
