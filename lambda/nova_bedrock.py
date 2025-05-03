##this is a working code for nova ai and can view the the output in postman - remove (#) comments to test it and comment other lamda codes (bedrock.py and bedrock_s3.py) before testing just incase 
# also change the model in line 20 in the stack test file 

#import boto3
#import json

#def lambda_bedrock(event, context):
#    prompt_text = (
#        "أنت خبير في إنشاء أسئلة رياضيات اختيار من متعدد باللغة العربية لطلاب الصف التاسع."
#        "أنشئ 5 أسئلة اختيار من متعدد."
#        "كل سؤال يجب أن يحتوي على 4 خيارات: (أ) (ب) (ج) (د)."
#        "حدد الإجابة الصحيحة بوضوح."
#    )
#
#    bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
#
#    body = {
#        "messages": [
#            {
#                "role": "user",
#                "content": [{"text": prompt_text}]
#            }
#        ],
#        "inferenceConfig": {
#            "max_new_tokens": 1000
#        }
#    }
#
#    try:
#        response = bedrock_runtime.invoke_model(
#            modelId="amazon.nova-pro-v1:0",
#            contentType="application/json",
#            accept="application/json",
#            body=json.dumps(body)
#        )
#
#        response_body = json.loads(response['body'].read())
#
#        # ✅ Parse based on actual structure of Nova Pro output
#        output = (
#            response_body.get("output", {})
#            .get("message", {})
#            .get("content", [{}])[0]
#            .get("text", "No text found")
#        )
#
#        return {
#            "statusCode": 200,
#            "body": json.dumps({"output": output})
#        }
#
#    except Exception as e:
#        return {
#            "statusCode": 500,
#            "body": json.dumps({"error": str(e)})
#        }
#