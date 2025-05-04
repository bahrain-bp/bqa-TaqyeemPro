import fitz  # PyMuPDF
import boto3
import json
import os

def lambda_bedrock(event, context):
    try:

        # Initialize S3 client
        s3 = boto3.client('s3')
        
        # S3 bucket and file details
        bucket_name = "testingbedrockuploadpdf"
        file_key = "G9 Mathematics Test Specifications 2024.pdf"

        # Get PDF from S3
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        pdf_content = response['Body'].read()

        # Process PDF from bytes
        doc = fitz.open(stream=pdf_content, filetype="pdf")

        # Extract text
        extracted_text = ""
        for page in doc:
            extracted_text += page.get_text()
        doc.close()

        # Prepare prompt for Nova based on extracted text
        prompt = (
            "أنت خبير في توليد أسئلة الرياضيات باللغة العربية، استخدم مواصفات اختبار الرياضيات للصف التاسع ونماذج الأسئلة التالية لتوليد 5 أسئلة جديدة (اختيار متعدد)، حافظ على نفس التنسيق ومستوى الصعوبة،\n"
            "مواصفات الاختبار ونماذج الأسئلة:\n"
            f"{extracted_text.strip()}\n\n"
            "التعليمات:\n"
            "- اكتب الأسئلة باللغة العربية.\n"
            "- يجب أن يحتوي كل سؤال على 4 خيارات (أ - ب - ج - د).\n"
            "- حدد الإجابة الصحيحة بوضوح.\n"
            "- طابق المهارات والبنية الموضحة في الأمثلة الأصلية."
        )

        # Call Nova Pro model on Bedrock
        bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

        body = {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}]
                }
            ],
            "inferenceConfig": {
                "max_new_tokens": 1000
            }
        }

        response = bedrock_runtime.invoke_model(
            modelId="amazon.nova-pro-v1:0",
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        response_body = json.loads(response['body'].read())

        # Parse output text
        output = (
            response_body.get("output", {})
            .get("message", {})
            .get("content", [{}])[0]
            .get("text", "No text found")
        )

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "text/plain"
            },
            "body": output  
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }