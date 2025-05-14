import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')

def handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT'
    }

    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps('Preflight OK')
        }

    try:
        body = json.loads(event['body'])

        question_id = body.get('questionId')
        if not question_id:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Missing questionId'})
            }

        # Common fields
        update_data = {
            'questionText': body.get('questionText', ''),
            'questionType': body.get('questionType', ''),
            'skillType': body.get('skillType', ''),
            'mark': body.get('mark', 1),
            'answerText': body.get('answerText', ''),
            'approved': body.get('approved', False)
        }

        # Type-specific fields
        if update_data['questionType'] == 'MCQ':
            update_data.update({
                'option1': body.get('option1', ''),
                'option2': body.get('option2', ''),
                'option3': body.get('option3', ''),
                'option4': body.get('option4', '')
            })
        elif update_data['questionType'] == 'T/F':
            update_data['options'] = ["True", "False"]

        # Build the update expression
        update_expr = "SET " + ", ".join(f"{k}=:{k}" for k in update_data.keys())
        expr_values = {f":{k}": v for k, v in update_data.items()}

        # Update the item in DynamoDB
        table.update_item(
            Key={'QuestionId': question_id},
            UpdateExpression=update_expr,
            ExpressionAttributeValues=expr_values
        )

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Question updated successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
