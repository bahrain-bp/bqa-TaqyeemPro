import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamResults')

def handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))

        # Common key for all questions
        student_id_grade = body['studentId_grade']
        timestamp = datetime.utcnow().isoformat()

        # Questions list
        questions = body.get('questions', [])

        if not questions:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No questions provided'})
            }

        for q in questions:
            item = {
                'studentId_grade': student_id_grade,
                'questionId_subject': q['questionId_subject'],
                'answerText': q.get('answerText', ''),
                'date&time': timestamp,
                'equation': q.get('equation'),
                'grade': int(q.get('grade', 0)),
                'language': q.get('language'),
                'mark': int(q.get('mark', 0)),
                'option1': q.get('option1'),
                'option2': q.get('option2'),
                'option3': q.get('option3'),
                'option4': q.get('option4'),
                'questionText': q.get('questionText'),
                'questionType': q.get('questionType'),
                'skillType': q.get('skillType'),
                'subject': q.get('subject'),
                'result': int(q.get('result', 0)),
                'status': q.get('status')
            }

            clean_item = {k: v for k, v in item.items() if v is not None}

            table.put_item(Item=clean_item)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Exam submitted successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
