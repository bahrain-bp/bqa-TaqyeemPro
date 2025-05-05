import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')

# Custom encoder to convert Decimal to float
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # You can use int(obj) if you prefer integers
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    try:
        response = table.scan()
        items = response.get('Items', [])
        return {
            'statusCode': 200,
            'body': json.dumps(items, cls=DecimalEncoder)  
        }
    except Exception as e:
        print("Error:", e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to retrieve questions', 'error': str(e)})
        }
