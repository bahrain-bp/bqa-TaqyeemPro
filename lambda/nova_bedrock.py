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
        file_key = "G9-Math.pdf"

        #file_key = "G" + str(grade) + "-" + subject + ".pdf"
        #file_key = f"G{str(grade)}-{subject}.pdf"

        total_questions = 10
        mcq = 5
        tf = 3
        short = 2

        grade = 9
        subject = "Math"

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

        prompt = (
             f"أنت خبير في إنشاء أسئلة لمادة {subject}.\n"
             f"بناءً على المواصفات والأسئلة المرفقة، أنشئ أسئلة جديدة بنفس الصيغة والصعوبة.\n"
             f"{extracted_text.strip()}\n\n"
             "التعليمات:\n"
             f"- أنشئ {total_questions} أسئلة ({mcq} اختيار من متعدد، {tf} صح وخطأ، {short} إجابة قصيرة).\n"
             "- الصيغة تكون CSV فقط تحتوي على الأعمدة التالية:\n"
             "subject_grade(math_9),questionId(Q1),answerText,approved(true),grade(9),mark,answerText,subject(math)"
             "- تأكد أن تكون كل القيم متوافقة مع التنسيق، واستخدم 'TRUE' أو 'FALSE' في approved.\n"
             "- لا تُدخل أسئلة تعتمد على صور.\n"
             "- استخدم LaTeX حيثما كان مناسباً."
         )

        # Call Nova Pro model on Bedrock
        bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

        lambda_client = boto3.client('lambda')

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

        # Parse output text
        output_text = (
            response_body.get("output", {})
            .get("message", {})
            .get("content", [{}])[0]
            .get("text", "No text found")
        )

        csv_start = output_text.find('```csv')
        if csv_start != -1:
            csv_start = output_text.find('\n', csv_start) + 1
            csv_end = output_text.find('```', csv_start)
            clean_csv = output_text[csv_start:csv_end].strip()
        else:
            clean_csv = output_text  # Fallback if no markdown
            
        lambda_client.invoke(
            FunctionName='ExamQuestionsWriter',
            InvocationType='Event',
            Payload=json.dumps({'body': clean_csv})
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