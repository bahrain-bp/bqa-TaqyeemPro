import boto3
import awscli
import json

input_data="""
generate 3 simple math questions for grade 6
"""

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
print("Full response:")
print(json.dumps(response_body, indent=2))

print("\nGenerated output:")
print(response_body["results"][0]["outputText"])