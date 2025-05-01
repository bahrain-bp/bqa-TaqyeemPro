import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')

def handler(event, context):
    try:
        body = json.loads(event['body'])
        
        # Validation: required fields
        required_fields = [
            'subject_grade', 'questionId', 'subject', 'grade',
            'questionText', 'questionType', 'answerText', 'mark', 'approved'
        ]

        missing_fields = [f for f in required_fields if f not in body]
        if missing_fields:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': f'Missing fields: {", ".join(missing_fields)}'})
            }

        # Validate and cast grade (must be integer)
        if not isinstance(body['grade'], int):
            try:
                body['grade'] = int(body['grade'])
            except (ValueError, TypeError):
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': '"grade" must be an integer'})
                }

        # Validate and cast mark (can be int or float)
        if not isinstance(body['mark'], (int, float)):
            try:
                body['mark'] = float(body['mark'])
            except (ValueError, TypeError):
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': '"mark" must be a number'})
                }

        # Validate and cast approved (must be boolean)
        if not isinstance(body['approved'], bool):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Invalid type: "approved" must be a boolean'})
            }

        # Prepare item
        question_item = {
            'subject_grade': body['subject_grade'],
            'questionId': body['questionId'],
            'subject': body['subject'],
            'grade': body['grade'],
            'questionText': body['questionText'],
            'questionType': body['questionType'],
            'answerText': body['answerText'],
            'mark': body['mark'],
            'approved': (body['approved'])
        }

        table.put_item(Item=question_item)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Question inserted successfully'})
        }

    except Exception as e:
        print("Error inserting item:", e)

        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to insert question', 'error': str(e)})
        }








