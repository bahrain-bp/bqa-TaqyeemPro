# import fitz  # PyMuPDF
# import boto3
# import json
# import json
# import boto3
# from decimal import Decimal

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('ExamQuestions')

# total_questions = 10
# mcq = 5
# tf = 3
# short = 2

# grade = 9
# subject = "Math"

# def lambda_bedrock(event, context):
#     try:

#         # Initialize S3 client
#         s3 = boto3.client('s3')
        
#         # S3 bucket and file details
#         bucket_name = "testingbedrockuploadpdf"
#         file_key = "G9-Math.pdf"

#         #file_key = "G" + str(grade) + "-" + subject + ".pdf"
#         #file_key = f"G{str(grade)}-{subject}.pdf"

#         # Get PDF from S3
#         response = s3.get_object(Bucket=bucket_name, Key=file_key)
#         pdf_content = response['Body'].read()

#         # Process PDF from bytes
#         doc = fitz.open(stream=pdf_content, filetype="pdf")

#         # Extract text
#         extracted_text = ""
#         for page in doc:
#             extracted_text += page.get_text()
#         doc.close()

#         prompt = (
#              f"أنت خبير في إنشاء أسئلة لمادة {subject}.\n"
#              f"بناءً على المواصفات والأسئلة المرفقة، أنشئ أسئلة جديدة بنفس الصيغة والصعوبة.\n"
#              f"{extracted_text.strip()}\n\n"
#              "التعليمات:\n"
#              f"- أنشئ {total_questions} أسئلة ({mcq} اختيار من متعدد، {tf} صح وخطأ، {short} إجابة قصيرة).\n"
#              "- الصيغة تكون json فقط تحتوي على الأعمدة التالية:\n"
#              "quesionText,questionType,answerText"
#              "- تأكد أن تكون كل القيم متوافقة مع التنسيق.\n"
#              "- لا تُدخل أسئلة تعتمد على صور.\n"
#              "- استخدم LaTeX حيثما كان مناسباً."
#         )

#         # Call Nova Pro model on Bedrock
#         bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

#         lambda_client = boto3.client('lambda')

#         body = {
#             "messages": [
#                 {
#                     "role": "user",
#                     "content": [{"text": prompt}]
#                 }
#             ],
#             "inferenceConfig": {
#                 "max_new_tokens": 1000
#             }
#         }

#         response = bedrock_runtime.invoke_model(
#             modelId="amazon.nova-pro-v1:0",
#             contentType="application/json",
#             accept="application/json",
#             body=json.dumps(body)
#         )

#         response_body = json.loads(response['body'].read())

#         # Parse output text
#         output = (
#             response_body.get("output", {})
#             .get("message", {})
#             .get("content", [{}])[0]
#             .get("text", "No text found")
#         )

#         return {
#             "statusCode": 200,
#             "headers": {
#                 "Content-Type": "text/plain"
#             },
#             "body": output  
#         }

#     except Exception as e:
#         return {
#             "statusCode": 500,
#             "body": json.dumps({"error": str(e)})
#         }

# def handler(event, context):
#     try:
#         # Parse JSON body if coming from API Gateway
#         if 'body' in event:
#             raw_input = json.loads(event['body'])
#         else:
#             raw_input = event

#         questions = parse_questions(raw_input.get('questions', []))

#         if not isinstance(questions, list):
#             return {
#                 'statusCode': 400,
#                 'body': json.dumps({'message': '"questions" must be a list of question objects'})
#             }

#         required_fields = [
#             'subject_grade', 'questionId', 'subject', 'grade',
#             'questionText', 'questionType', 'answerText', 'mark', 'approved'
#         ]

#         inserted_count = 0

#         for q in questions:
#             # Check required fields
#             missing_fields = [f for f in required_fields if f not in q]
#             if missing_fields:
#                 return {
#                     'statusCode': 400,
#                     'body': json.dumps({'message': f'Missing fields: {", ".join(missing_fields)} in question {q}'})
#                 }

#             try:
#                 if not isinstance(q['grade'], (int, str)):
#                     raise ValueError('"grade" must be an integer or string number')
#                 q['grade'] = int(q['grade'])

#                 if not isinstance(q['mark'], (int, float, str)):
#                     raise ValueError('"mark" must be a number')
#                 try:
#                     q['mark'] = Decimal(str(q['mark']))  # ensures always Decimal
#                 except (InvalidOperation, ValueError, TypeError):
#                     raise ValueError('"mark" must be a valid decimal number')

#                 if isinstance(q['approved'], str):
#                     if q['approved'].lower() == 'true':
#                         q['approved'] = True
#                     elif q['approved'].lower() == 'false':
#                         q['approved'] = False
#                     else:
#                         raise ValueError('"approved" must be true or false')
#                 elif not isinstance(q['approved'], bool):
#                     raise ValueError('"approved" must be a boolean')

#             except ValueError as e:
#                 return {
#                     'statusCode': 400,
#                     'body': json.dumps({'message': str(e)})
#                 }

#             # Insert after validation
#             table.put_item(Item=q)
#             inserted_count += 1

#         return {
#             'statusCode': 200,
#             'body': json.dumps({'message': f'{inserted_count} questions inserted successfully'})
#         }

#     except ValueError as e:
#         return {
#             'statusCode': 400,
#             'body': json.dumps({'message': str(e)})
#         }

#     except Exception as e:
#         print("Unexpected error inserting questions:", e)
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'message': 'Failed to insert questions', 'error': str(e)})
#         }

# # Safe parser
# def parse_questions(input_data):
#     try:
#         if isinstance(input_data, str):
#             return json.loads(input_data)
#         return input_data
#     except Exception as e:
#         raise ValueError(f'Invalid JSON for questions: {str(e)}')