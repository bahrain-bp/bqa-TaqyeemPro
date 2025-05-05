# import fitz  # PyMuPDF
# import boto3
# import json
# import os

# def lambda_bedrock(event, context):
#     try:

#         # Initialize S3 client
#         s3 = boto3.client('s3')
        
#         # S3 bucket and file details
#         bucket_name = "testingbedrockuploadpdf"
#         file_key = "G" + str(grade) + "-" + subject + ".pdf"

#         quesions = 10
#         mcq = 5
#         tf = 3
#         short = 2
#         grade = 9
#         subject = "math"

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

#         # Prepare prompt for Nova based on extracted text
#         prompt = (
#         "You are an expert at generating " + subject + " questions.\n"
#         "Use the Test Specifications and the following sample questions to generate a new questions.\n"
#         "Maintain the same format and difficulty level\n"
#         "Test Specifications and Sample Questions:\n"
#         f"{extracted_text.strip()}\n\n"
#         "Instructions:\n"
#         "- Write the questions in Arabic.\n"
#         "- Each question must have 4 options.\n"
#         "- Match the skills and structure shown in the original examples."
#         "- Ignore the questions that needs visuals to answer (text only).\n"
#         "- Use LateX for the question format."
#         "- The output should countain only this in csv format.\n"
#         "- grade, subject, questionType(mcq-t\f), questionText, options(45-20-21), answer.\n"
#         )

#         # Call Nova Pro model on Bedrock
#         bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

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