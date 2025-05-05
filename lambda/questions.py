import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')

def lambda_storeQ(event, context):
    try:
        # Parse JSON body if coming from API Gateway
        if 'body' in event:
            raw_input = json.loads(event['body'])
        else:
            raw_input = event

        questions = parse_questions(raw_input.get('questions', []))

        if not isinstance(questions, list):
            return {
                'statusCode': 400,
                'body': json.dumps({'message': '"questions" must be a list of question objects'})
            }

        required_fields = [
            'subject_grade', 'questionId', 'subject', 'grade',
            'questionText', 'questionType', 'answerText', 'mark', 'approved'
        ]

        inserted_count = 0

        for q in questions:
            # Check required fields
            missing_fields = [f for f in required_fields if f not in q]
            if missing_fields:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': f'Missing fields: {", ".join(missing_fields)} in question {q}'})
                }

            try:
                if not isinstance(q['grade'], (int, str)):
                    raise ValueError('"grade" must be an integer or string number')
                q['grade'] = int(q['grade'])

                if not isinstance(q['mark'], (int, float, str)):
                    raise ValueError('"mark" must be a number')
                try:
                    q['mark'] = Decimal(str(q['mark']))  # ensures always Decimal
                except (ValueError, TypeError):
                    raise ValueError('"mark" must be a valid decimal number')

                if isinstance(q['approved'], str):
                    if q['approved'].lower() == 'true':
                        q['approved'] = True
                    elif q['approved'].lower() == 'false':
                        q['approved'] = False
                    else:
                        raise ValueError('"approved" must be true or false')
                elif not isinstance(q['approved'], bool):
                    raise ValueError('"approved" must be a boolean')

            except ValueError as e:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': str(e)})
                }

            # Insert after validation
            table.put_item(Item=q)
            inserted_count += 1

        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'{inserted_count} questions inserted successfully'})
        }

    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(e)})
        }

    except Exception as e:
        print("Unexpected error inserting questions:", e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to insert questions', 'error': str(e)})
        }

# Safe parser
def parse_questions(input_data):
    try:
        if isinstance(input_data, str):
            return json.loads(input_data)
        return input_data
    except Exception as e:
        raise ValueError(f'Invalid JSON for questions: {str(e)}')