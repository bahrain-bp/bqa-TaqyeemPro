import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')

def handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT'
    }

    if event.get('httpMethod', '') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps('Preflight OK')
        }

    try:
        body = json.loads(event['body'])

        exam_id = body.get('ExamId')
        subject_grade = body.get('Subject_grade')

        # All expected fields from request (add/remove fields as needed)
        update_data = {
            'title': body.get('examTitle', '').strip(),
            'description': body.get('examDescription', '').strip(),
            'active': body.get('active','').strip().lower(),
            'duration': int(body.get('duration', 0)),
            'questions': body.get('questions', [])
        }

        # Build the update expression
        update_expr = "SET " + ", ".join(f"#{k} = :{k}" for k in update_data)
        expr_names = {f"#{k}": k for k in update_data}
        expr_values = {f":{k}": v for k, v in update_data.items()}

        # Update the item in DynamoDB
        table.update_item(
            Key={
                'Subject_grade': subject_grade,
                'ExamId': exam_id
            },
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values
        )

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'Exam updated successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
