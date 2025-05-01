import boto3
import json

def lambda_handler(event, context):
    #input_data = "generate 5 math questions for each example similar to this in arabic (give me only the questions no more) "+ extract_text

    bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

    body = {
        "inferenceConfig": {
            "max_new_tokens": 1000
        },
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": "list 5 animals"
                    }
                ]
            }
        ]
    }

    response = bedrock.invoke_model(
        modelId="amazon.nova-pro-v1:0",
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