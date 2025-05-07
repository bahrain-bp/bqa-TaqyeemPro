#import boto3
#import json
#import fitz  # PyMuPDF
#import io
#
#def extract_text_from_pdf(pdf_stream):
#    doc = fitz.open(stream=pdf_stream, filetype="pdf")
#    text = ""
#    for page in doc:
#        text += page.get_text()
#    return text
#
#def lambda_bedrock(event, context):
#    body = json.loads(event['body'])
#    bucket_name = body.get("bucket")
#    object_key = body.get("key")
#
#    if not bucket_name or not object_key:
#        return {
#            "statusCode": 400,
#            "body": json.dumps({"error": "Missing 'bucket' or 'key' in request body."})
#        }
#
#    # Read the PDF from S3
#    s3 = boto3.client('s3')
#    s3_object = s3.get_object(Bucket=bucket_name, Key=object_key)
#    pdf_stream = s3_object['Body'].read()
#    extracted_text = extract_text_from_pdf(io.BytesIO(pdf_stream))
#
#    # Construct the prompt
#    custom_prompt = (
#        "You are an expert Arabic math question generator. "
#        "Use the following Grade 9 math test specifications and sample questions to generate 5 new multiple-choice questions. "
#        "Maintain the same format and difficulty level.\n\n"
#        "Test Specifications and Sample Questions:\n\n"
#        + extracted_text.strip() +
#        "\n\nInstructions:\n"
#        "- Write questions in Arabic.\n"
#        "- Each question must have 4 choices (أ - ب - ج - د).\n"
#        "- Indicate the correct answer clearly.\n"
#        "- Match the skills and structure shown in the original examples.\n"
#    )
#
#    # Send to Bedrock
#    bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
#
#    bedrock_request = {
#        "inputText": custom_prompt,
#        "textGenerationConfig": {
#            "maxTokenCount": 3072,
#            "stopSequences": [],
#            "temperature": 0.7,
#            "topP": 0.9
#        }
#    }
#
#    response = bedrock_runtime.invoke_model(
#        modelId="amazon.titan-text-premier-v1:0",
#        contentType="application/json",
#        accept="application/json",
#        body=json.dumps(bedrock_request)
#    )
#
#    response_body = json.loads(response['body'].read())
#    output_text = response_body["results"][0]["outputText"]
#
#    return {
#        "statusCode": 200,
#        "body": output_text
#    }
