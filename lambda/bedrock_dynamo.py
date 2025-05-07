# import fitz
# import boto3
# import json
# from decimal import Decimal

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('ExamQuestions')

# def lambda_handler(event, context):
#     try:
#         s3 = boto3.client('s3')
#         bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

#         # إعداد البيانات
#         bucket_name = "testingbedrockuploadpdf"
#         subject = "Math"
#         grade = 9
#         file_key = f"G{grade}-{subject}.pdf"

#         total_questions = 10
#         mcq = 5
#         tf = 3
#         short = 2

#         # قراءة PDF من S3
#         response = s3.get_object(Bucket=bucket_name, Key=file_key)
#         pdf_content = response['Body'].read()
#         doc = fitz.open(stream=pdf_content, filetype="pdf")

#         extracted_text = ""
#         for page in doc:
#             extracted_text += page.get_text()
#         doc.close()

#         # إعداد الطلب إلى Bedrock
#         prompt = (
#             f"أنت خبير في إنشاء أسئلة لمادة {subject}.\n"
#             f"بناءً على المواصفات والأسئلة المرفقة، أنشئ أسئلة جديدة بنفس الصيغة والصعوبة.\n"
#             f"{extracted_text.strip()}\n\n"
#             "التعليمات:\n"
#             f"- أنشئ {total_questions} أسئلة ({mcq} اختيار من متعدد، {tf} صح وخطأ، {short} إجابة قصيرة).\n"
#             "- الصيغة تكون JSON فقط تحتوي على الأعمدة التالية:\n"
#             "questionText, questionType, answerText"
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
#         output_text = (
#             response_body.get("output", {})
#             .get("message", {})
#             .get("content", [{}])[0]
#             .get("text", "")
#         )

#         # محاولة تحويل النص إلى JSON
#         try:
#             questions_json = json.loads(output_text)
#         except json.JSONDecodeError as e:
#             raise ValueError(f"Failed to parse Bedrock output as JSON: {e}")

#         # إدخال الأسئلة في DynamoDB
#         question_id = 1
#         inserted_count = 0
#         for q in questions_json:
#             item = {
#                 "questionId": question_id,
#                 "subject_grade": f"{subject}_G{grade}",
#                 "subject": subject,
#                 "grade": grade,
#                 "questionText": q.get("questionText"),
#                 "questionType": q.get("questionType"),
#                 "answerText": q.get("answerText"),
#                 "mark": Decimal("1"),
#                 "approved": False
#             }
#             table.put_item(Item=item)
#             question_id += 1
#             inserted_count += 1

#         return {
#             "statusCode": 200,
#             "body": json.dumps({"message": f"{inserted_count} questions inserted successfully."})
#         }

#     except Exception as e:
#         return {
#             "statusCode": 500,
#             "body": json.dumps({"error": str(e)})
#         }
