import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')  

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))

        title = body.get('title', '').strip()
        subject = body.get('subject', '').strip()
        grade = int(body.get('grade', 0))
        language = body.get('language', '').strip()
        description = body.get('description', '').strip()
        duration = int(body.get('duration', 0))
        questions = body.get('questions', [])  #QuestionIds array

        # Basic validation
        if not title or not subject or not grade or not language or not questions:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing required exam fields"})
            }

        # Generate a unique exam ID
        examid = str(uuid.uuid4())

        # Create the exam record
        item = {
            "ExamId": examid,
            "Title": title,
            "Subject": subject,
            "Grade": grade,
            "Language": language,
            "Description": description,
            "Duration": duration,
            "Questions": questions,
            "CreationDate": datetime.utcnow().isoformat(),
            "isActive": True
        }

        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Exam created successfully",
                "examId": examid
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
