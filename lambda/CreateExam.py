import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')

def lambda_handler(event, context):
    # Always add CORS headers in every response
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
    }

    # Handle preflight OPTIONS request
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "CORS preflight success"})
        }

    try:
        # Parse request body (expecting JSON)
        body = json.loads(event.get('body', '{}'))

        title = body.get('Exam Title', '').strip()
        description = body.get('Exam Description', '').strip()
        subject = body.get('Subject', '').strip()
        grade = int(body.get('Grade', 0))
        language = body.get('Language', '').strip()
        active_input = body.get('Active', 'No').strip().lower()
        is_active = active_input == 'yes'
        duration = int(body.get('Duration', 0))
        questions = body.get('Questions', [])

        # Basic validation
        if not title or not subject or not grade or not language or not questions:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Missing required exam fields"})
            }

        # Generate unique exam ID
        examid = str(uuid.uuid4())

        # Create item for DynamoDB
        item = {
            "ExamId": examid,
            "Exam Title": title,
            "Exam Description": description,
            "Subject": subject,
            "Grade": grade,
            "Language": language,
            "Duration": duration,
            "isActive": is_active,
            "Questions": questions,
            "CreationDate": datetime.utcnow().isoformat()
        }

        # Save item to DynamoDB
        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Exam created successfully",
                "examId": examid
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Internal server error", "details": str(e)})
        }
