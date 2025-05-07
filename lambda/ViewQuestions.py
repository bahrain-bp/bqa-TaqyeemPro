import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')

# Custom encoder to convert Decimal to float
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # Convert Decimal to float for JSON compatibility
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    try:
        # Fetch items from DynamoDB
        response = table.scan()
        items = response.get('Items', [])

        # Return the response with CORS headers and encoded items
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Allow all origins, adjust if needed
                'Access-Control-Allow-Headers': '*',  # Allow all headers
                'Access-Control-Allow-Methods': 'GET'  # Allow GET method
            },
            'body': json.dumps(items, cls=DecimalEncoder)  # Use DecimalEncoder to handle Decimal fields
        }

    except Exception as e:
        print("Error:", e)
        # Return error response with CORS headers
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps({'message': 'Failed to retrieve questions', 'error': str(e)})
        }
