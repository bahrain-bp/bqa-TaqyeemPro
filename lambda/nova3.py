# import fitz
# import boto3
# import json
# import csv
# import io
# import uuid

# def lambda_bedrock(event, context):
#     try:
#         s3 = boto3.client('s3')
#         lambda_client = boto3.client('lambda')
#         bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

#         grade = 9
#         subject = "math"

#         total_questions = 10
#         mcq = 5
#         tf = 3
#         short = 2

#         bucket_name = "testingbedrockuploadpdf"
#         file_key = "G9-Math.pdf"

#         response = s3.get_object(Bucket=bucket_name, Key=file_key)
#         pdf_content = response['Body'].read()

#         doc = fitz.open(stream=pdf_content, filetype="pdf")
#         extracted_text = "".join(page.get_text() for page in doc)
#         doc.close()

#         prompt = (
#             f"أنت خبير في إنشاء أسئلة لمادة {subject}.\n"
#             f"بناءً على المواصفات والأسئلة المرفقة، أنشئ أسئلة جديدة بنفس الصيغة والصعوبة.\n"
#             f"{extracted_text.strip()}\n\n"
#             "التعليمات:\n"
#             f"- أنشئ {total_questions} أسئلة ({mcq} اختيار من متعدد، {tf} صح وخطأ، {short} إجابة قصيرة).\n"
#             "- الصيغة تكون CSV فقط تحتوي على الأعمدة التالية:\n"
#             "subject_grade,questionId,subject,grade,questionText,questionType,answerText,mark,approved,"
#             "option1,option2,option3,option4\n"
#             "- تأكد أن تكون كل القيم متوافقة مع التنسيق، واستخدم 'TRUE' أو 'FALSE' في approved.\n"
#             "- لا تُدخل أسئلة تعتمد على صور.\n"
#             "- استخدم LaTeX حيثما كان مناسباً."
#         )

#         body = {
#             "messages": [{"role": "user", "content": [{"text": prompt}]}],
#             "inferenceConfig": {"max_new_tokens": 1000}
#         }

#         response = bedrock_runtime.invoke_model(
#             modelId="amazon.nova-pro-v1:0",
#             contentType="application/json",
#             accept="application/json",
#             body=json.dumps(body)
#         )

#         response_body = json.loads(response['body'].read())
#         output = (
#             response_body.get("output", {})
#             .get("message", {})
#             .get("content", [{}])[0]
#             .get("text", "")
#         )

#         # Parse CSV-style response into list of question dictionaries
#         questions = []
#         csv_data = list(csv.DictReader(io.StringIO(output)))

#         for row in csv_data:
#             row['mark'] = float(row.get('mark', 1))
#             row['approved'] = row.get('approved', 'False').strip().lower() == 'true'
#             row['questionId'] = row.get('questionId') or str(uuid.uuid4())
#             questions.append(row)

#         # Invoke DynamoDB Lambda function
#         lambda_response = lambda_client.invoke(
#             FunctionName="lambda_storeQ",  # replace with actual Lambda name if needed
#             InvocationType="RequestResponse",
#             Payload=json.dumps({"questions": questions})
#         )

#         lambda_output = json.load(lambda_response['Payload'])

#         return {
#             "statusCode": 200,
#             "body": json.dumps({
#                 "questions": questions,
#                 "dynamodb_response": lambda_output
#             }),
#             "headers": {
#                 "Content-Type": "application/json"
#             }
#         }

#     except Exception as e:
#         return {
#             "statusCode": 500,
#             "body": json.dumps({"error": str(e)})
#         }
