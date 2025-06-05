import json
import boto3
import os
from boto3.dynamodb.conditions import Key
import decimal

dynamodb = boto3.resource('dynamodb')
exams_table = dynamodb.Table('GeneratedExams')
questions_table = dynamodb.Table('ExamQuestions')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # Convert to int if possible, else float
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    try:
        exams_response = exams_table.scan()
        exams = exams_response.get('Items', [])

        # Expand questions for each exam
        for exam in exams:
            full_questions = []
            for q in exam.get('questions', []):
                if isinstance(q, dict):
                    pk = q.get('subject_grade')
                    sk = q.get('questionId')
                else:
                    # Assume q is a string (questionId), use exam's subject_grade if available
                    pk = exam.get('subject_grade') or exam.get('subject')  # adjust as needed
                    sk = q
                if pk and sk:
                    question_res = questions_table.get_item(Key={
                        'subject_grade': pk,
                        'questionId': sk
                    })
                    if 'Item' in question_res:
                        full_questions.append(question_res['Item'])
            exam['fullQuestions'] = full_questions

        return {
            'statusCode': 200,
            'body': json.dumps({'exams': exams}, cls=DecimalEncoder)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }