import boto3
import os
import json

# Initialize the Bedrock Agent client
bedrock_agent = boto3.client("bedrock-agent")

def lambda_handler(event, context):
    try:
        # Load IDs from environment variables
        knowledge_base_id = os.environ["OZO0ZQ1PXP"]
        data_source_id = os.environ["AHJCHXYQBK"]

        # Start ingestion job to sync new documents in the data source
        response = bedrock_agent.start_ingestion_job(
            knowledgeBaseId=knowledge_base_id,
            dataSourceId=data_source_id,
            clientToken="sync-trigger-from-s3"  #idempotency token
        )

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Ingestion triggered successfully.",
                "ingestionJobId": response.get("ingestionJob", {}).get("ingestionJobId", "N/A")
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
