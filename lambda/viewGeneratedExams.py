import json
import boto3
import decimal

dynamodb = boto3.resource('dynamodb')
exams_table = dynamodb.Table('GeneratedExams')
questions_table = dynamodb.Table('ExamQuestions')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super().default(obj)

def handler(event, context):
    try:
        # Scan all exams
        exams_response = exams_table.scan()
        exams = exams_response.get('Items', [])

        for exam in exams:
            subject = exam.get("subject")
            grade = exam.get("grade")
            subject_grade = f"{subject}_{grade}"
            question_ids = exam.get("questions", [])

            full_questions = []
            for qid in question_ids:
                if not isinstance(qid, str):
                    continue  # skip invalid entries
    
                response = questions_table.get_item(Key={
                    'Subject_grade': subject_grade,
                    'QuestionId': qid
                })

                item = response.get('Item')
                if item:
                    full_questions.append({
                        'QuestionId': item.get('QuestionId'),
                        'questionText': item.get('questionText'),
                        'questionType': item.get('questionType'),
                        'skillType': item.get('skillType'),
                        'answerText': item.get('answerText'),
                        'option1': item.get('option1', ''),
                        'option2': item.get('option2', ''),
                        'option3': item.get('option3', ''),
                        'option4': item.get('option4', ''),
                    })

            exam['fullQuestions'] = full_questions

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            'body': json.dumps({'exams': exams}, cls=DecimalEncoder, ensure_ascii=False)

        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }