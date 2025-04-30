import boto3
import json

def lambda_bedrock(event, context):
    input_data = "generate 3 simple math questions for grade 6"

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