import json

def lambda_handler(event, context):
    # Parse the input from the API Gateway event
    try:
        body = json.loads(event.get('body', '{}'))
        model_id = body.get("modelId", "amazon.titan-embed-text-v2:0")
        content_type = body.get("contentType", "application/json")
        accept = body.get("accept", "*/*")
        input_text = body.get("body", "{\"inputText\":\"this is where you place your input text\", \"dimensions\": 512, \"normalize\": true}")

        # Simulate processing the input
        response = {
            "modelId": model_id,
            "contentType": content_type,
            "accept": accept,
            "processedBody": json.loads(input_text)
        }

        return {
            "statusCode": 200,
            "body": json.dumps(response)
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
