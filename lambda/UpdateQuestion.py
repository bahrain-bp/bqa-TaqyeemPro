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

        question_id = body.get('QuestionId')
        subject_grade = body.get('Subject_grade')

        # All expected fields from request
        update_data = {
            'answerText': body.get('answerText', ''),
            'approved': body.get('approved', False),
            'equation': body.get('equation', ''),
            'grade': body.get('grade', ''),
            'language': body.get('language', ''),
            'mark': body.get('mark', 1),
            'option1': body.get('option1', ''),
            'option2': body.get('option2', ''),
            'option3': body.get('option3', ''),
            'option4': body.get('option4', ''),
            'questionText': body.get('questionText', ''),
            'questionType': body.get('questionType', ''),
            'skillType': body.get('skillType', ''),
            'subject': body.get('subject', ''),
        }

        # Build the update expression with ExpressionAttributeNames to support fields with spaces
        update_expr = "SET " + ", ".join(f"#{k.replace(' ', '')} = :{k.replace(' ', '')}" for k in update_data)
        expr_names = {f"#{k.replace(' ', '')}": k for k in update_data}
        expr_values = {f":{k.replace(' ', '')}": v for k, v in update_data.items()}

        # Update the item in DynamoDB
        table.update_item(
            Key={
                'Subject_grade': subject_grade,
                'QuestionId': question_id
            },
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_names,
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
