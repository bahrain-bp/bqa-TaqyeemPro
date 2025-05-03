import boto3
import json

def lambda_bedrock(event, context):
    input_data = (
        "You are an expert Arabic math question generator. "
        "Generate 5 math multiple-choice questions for Grade 9. "
        "\n\nInstructions:\n"
        "- Write questions in Arabic.\n"
        "- Each question must have 4 choices (أ - ب - ج - د).\n"
        "- Indicate the correct answer clearly.\n"
    )

    bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

    body = {
        "inputText": input_data,
        "textGenerationConfig": {
            "maxTokenCount": 3072,
            "stopSequences": [],
            "temperature": 0.7,
            "topP": 0.9
        }
    }

    response = bedrock_runtime.invoke_model(
        modelId="amazon.titan-text-premier-v1:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body)
    )

    response_body = json.loads(response['body'].read())

    output_text = response_body["results"][0]["outputText"]

    return {
        "statusCode": 200,
        "body": output_text
        }