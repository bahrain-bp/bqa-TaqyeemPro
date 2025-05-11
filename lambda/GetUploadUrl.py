import json
import boto3
import os

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Parse the incoming request body
        body = json.loads(event['body'])
        file_name = body['fileName'] 
        content_type = body['contentType'] 
        bucket_name = os.environ['BUCKET_NAME']

        # Define the parameters for the pre-signed URL
        params = {
            'Bucket': bucket_name,
            'Key': file_name,
            'ContentType': content_type  # Required if your frontend includes it
        }

        # Generate the pre-signed URL
        upload_url = s3.generate_presigned_url(
            'put_object',
            Params=params,
            ExpiresIn=300  # URL expires in 5 minutes
        )

        # Return the pre-signed URL and file key
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST',
            },
            'body': json.dumps({
                'uploadUrl': upload_url,
                'key': file_name
            })
        }

    except Exception as e:
        print("Error generating pre-signed URL:", e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST',
            },
            'body': json.dumps({'error': 'Failed to generate upload URL', 'message': str(e)})
        }
