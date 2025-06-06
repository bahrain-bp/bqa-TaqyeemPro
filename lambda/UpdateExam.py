import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('GeneratedExams')

def handler(event, context):
    # CORS headers
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,PUT"
    }
    
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "CORS preflight success"})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        # Required fields
        exam_id = body.get('examId')
        if not exam_id:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Missing examId"})
            }
        
        # Update expression
        update_expression = "SET"
        expression_attr_values = {}
        expression_attr_names = {}
        
        fields_to_update = [
            'examTitle', 'examDescription', 'subject', 
            'grade', 'language', 'duration', 'isActive', 'questions'
        ]
        
        for field in fields_to_update:
            if field in body:
                update_expression += f"#{field} = :{field}, "
                expression_attr_names[f"#{field}"] = field
                expression_attr_values[f":{field}"] = body[field]
        
        # Remove trailing comma
        update_expression = update_expression.rstrip(', ')
        
        # Update item in DynamoDB
        response = table.update_item(
            Key={'examId': exam_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attr_names,
            ExpressionAttributeValues=expression_attr_values,
            ReturnValues="UPDATED_NEW"
        )
        
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "Exam updated successfully"})
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "error": "Internal server error",
                "details": str(e)
            })
        }

# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('GeneratedExams')

# def handler(event, context):
#     headers = {
#         'Access-Control-Allow-Origin': '*',
#         'Access-Control-Allow-Headers': 'Content-Type',
#         'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT'
#     }

#     if event.get('httpMethod', '') == 'PUT':
#         return {
#             'statusCode': 200,
#             'headers': headers,
#             'body': json.dumps('Preflight OK')
#         }

#     try:
#         body = json.loads(event['body'])

#         exam_id = body.get('ExamId')
#         subject_grade = body.get('Subject_grade')

#         # All expected fields from request (add/remove fields as needed)
#         update_data = {
#             'title': body.get('examTitle', '').strip(),
#             'description': body.get('examDescription', '').strip(),
#             'active': body.get('active','').strip().lower(),
#             'duration': int(body.get('duration', 0)),
#             'questions': body.get('questions', [])
#         }

#         # Build the update expression
#         update_expr = "SET " + ", ".join(f"#{k} = :{k}" for k in update_data)
#         expr_names = {f"#{k}": k for k in update_data}
#         expr_values = {f":{k}": v for k, v in update_data.items()}

#         table.update_item(
#             Key={'examId': exam_id},
#             UpdateExpression=update_expr,
#             ExpressionAttributeNames=expr_names,
#             ExpressionAttributeValues=expr_values
#         )

#         return {
#             'statusCode': 200,
#             'headers': headers,
#             'body': json.dumps({'message': 'Exam updated successfully'})
#         }

#     except Exception as e:
#         return {
#             'statusCode': 500,
#             'headers': headers,
#             'body': json.dumps({'error': str(e)})
#         }
