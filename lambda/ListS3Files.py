import json
import boto3
import os

s3_client = boto3.client("s3")

def handler(event, context):
    bucket_name = os.environ.get("BUCKET_NAME")

    try:
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        contents = response.get("Contents", [])

        file_names = [item["Key"] for item in contents]

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  # <-- This enables CORS
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            },
            "body": json.dumps({"files": file_names})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  # <-- Also add CORS here
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            },
            "body": json.dumps({"error": "Failed to list files"})
        }
