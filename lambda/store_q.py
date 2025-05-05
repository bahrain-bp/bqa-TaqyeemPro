import csv
import json
import boto3
from io import StringIO

def lambda_storeQ(event, context):
    print("Raw input event:", json.dumps(event))
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ExamQuestions')
    
    try:
        # Handle both API Gateway proxy and direct Lambda invocations
        csv_data = event.get('body', event).strip()
        if isinstance(csv_data, dict):
            csv_data = csv_data.get('body', '')
            
        reader = csv.DictReader(StringIO(csv_data))
        
        for row in reader:
            item = {
                'subject_grade': row['subject_grade'],
                'questionId': int(row['questionId']),
                'answerText': row['answerText'],
                'approved': row['approved'].upper() == 'TRUE',
                'grade': int(row['grade']),
                'mark': int(row['mark']),
                'questionType': row['questionType'],
                'questionText': row['questionText'],
                'subject': row['subject'],
            }

            table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'body': json.dumps(f'Stored {reader.line_num - 1} questions')
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }