import boto3

import os

import json
 
step_client = boto3.client('stepfunctions')
 
def lambda_handler(event, context):

    try:

        state_machine_arn = os.environ['STEP_FUNCTION_ARN']
 
        # You can pass request body directly if needed

        input_data = event.get('body', '{}')
 
        response = step_client.start_execution(

            stateMachineArn=state_machine_arn,

            input=input_data

        )
 
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            "body": json.dumps({
                "message": "Step function triggered",
                "executionArn": response["executionArn"]
            })
        }
 
    except Exception as e:

        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            "body": json.dumps({"error": str(e)})
        }

 