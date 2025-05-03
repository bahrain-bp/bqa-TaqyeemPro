import fitz  # PyMuPDF
import boto3
import json
import os

def lambda_bedrock(event, context):
    try:
        # Read the local PDF file (placed in the same Lambda deployment package)
        pdf_path = "G12 Mathematical Skills Test Specifications 2024.pdf"
        doc = fitz.open(pdf_path)

        # Extract all text from the PDF
        extracted_text = ""
        for page in doc:
            extracted_text += page.get_text()

        doc.close()

        # Prepare prompt for Nova based on extracted text
        prompt = (
            "استنادًا إلى المواصفات التالية، أنشئ 5 أسئلة اختيار من متعدد في الرياضيات للصف الثاني عشر:\n\n"
            f"{extracted_text}\n\n"
            "كل سؤال يجب أن يحتوي على 4 خيارات (أ، ب، ج، د)، وحدد الإجابة الصحيحة بوضوح."
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
            "body": json.dumps({"output": output})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
