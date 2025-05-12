import fitz  # PyMuPDF
import boto3
import json
import json
import boto3
import re
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestionstesting')


def lambda_bedrock(event, context):
    try:
        # Parse input from API Gateway
        try:
            # Get parameters from request body
            request_body = json.loads(event.get('body', '{}'))
            
            # grade = int(request_body.get('grade', 0))
            # subject = request_body.get('subject', '').strip()
            # mcq = int(request_body.get('mcq', 0))
            # tf = int(request_body.get('tf', 0))
            # short = int(request_body.get('short', 0))
            
            grade = 9
            subject = "Math"
            mcq = 4
            tf = 4
            short = 2
            
        except json.JSONDecodeError:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Invalid JSON format in request body"})
            }
        except ValueError as e:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": f"Invalid parameter type: {str(e)}"})
            }

        # Validate required parameters
        validation_errors = []
        if not subject:
            validation_errors.append("Subject is required")
        if grade < 1 or grade > 12:
            validation_errors.append("Grade must be between 1 and 12")
        if mcq < 0 or tf < 0 or short < 0:
            validation_errors.append("Question counts cannot be negative")

        if validation_errors:
            return {
                "statusCode": 400,
                "body": json.dumps({"errors": validation_errors})
            }

        total_questions = mcq + tf + short
        if total_questions <= 0:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "At least one question type must have a positive count"})
            }

        # Initialize S3 client
        s3 = boto3.client('s3')
        
        # S3 bucket and file details
        bucket_name = "taqyeemprostack-curriculumdocsbucketb1075275-nawzlsopip18"
        file_key = "G"+str(grade)+"-"+subject+".pdf"
        #file_key = "G9-Math.pdf" #must taken from event
        #file_key = f"G{str(grade)}-{subject}.pdf"

        # Get PDF from S3
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        pdf_content = response['Body'].read()

        # Process PDF from bytes
        doc = fitz.open(stream=pdf_content, filetype="pdf")

        # Extract text
        extracted_text = ""
        for page in doc:
            extracted_text += page.get_text()
        doc.close()

        prompt = (
            f"You are an expert in generating questions for the subject {subject}.\n"
            f"Based on the specifications and sample questions, create new questions with the same format and difficulty level.\n"
            f"{extracted_text.strip()}\n\n"
            "Instructions:\n"
            "Write the questions in English unless the subject is Arabic.\n"
            f"- Generate {total_questions} questions ({mcq} multiple choice, {tf} true/false, {short} short answer).\n"
            "- The format should be JSON only and must include the following fields:\n"
            "questionText, questionType (MCQ, T/F, Short answer), answerText (right answer), option1 (for MCQ), option2 (for MCQ), option3 (for MCQ), option4 (for MCQ)\n"
            "- Ensure all values are properly formatted.\n"
            "- Do not include any questions that rely on images.\n"
            #- Use LaTeX where appropriate for equations only."
        )

        # Call Nova Pro model on Bedrock
        bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")

        lambda_client = boto3.client('lambda')

        body = {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}]
                }
            ],
            "inferenceConfig": {
                "max_new_tokens": 1000
            }
        }

        response = bedrock_runtime.invoke_model(
            modelId="amazon.nova-pro-v1:0",
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        response_body = json.loads(response['body'].read())

        # Parse output text
        output = (
            response_body.get("output", {})
            .get("message", {})
            .get("content", [{}])[0]
            .get("text", "No text found")
        )
        
        cleaned_output = re.sub(r"^```json\s*|\s*```$", "", output.strip(), flags=re.IGNORECASE)

        final = json.loads(cleaned_output)
        
        # json_string = output.replace('json', '').strip()  
        
        # cleaned_json = json_string.strip()
        
        # cleaned_loads = json.loads(cleaned_json)
        
        # print("cleaned_loads: ",cleaned_loads) 
        
        # إدخال الأسئلة في DynamoDB
        question_id = 1
        inserted_count = 0
        for q in final:
            item = {
                "questionId": f"Q{question_id}",
                "subject_grade": f"{subject}_{grade}",
                "subject": subject,
                "grade": grade,
                "questionText": q["questionText"],
                "questionType": q["questionType"],
                "answerText": q["answerText"],
                "mark": Decimal("1"),
                "approved": False
            }
            
            # Try to get pre-formed options list first
            if q["questionType"] == "MCQ":
                options = []
                
                # Collect options in order
                for i in range(1, 5):
                    opt_key = f"option{i}"
                    if opt_key in q:
                        options.append(q[opt_key])
                
                # Ensure exactly 4 options
                if len(options) != 4:
                    options = ["Missing option"] * 4
                
                # Store as comma-separated string
                item["options"] = ", ".join(options)
            
            table.put_item(Item=item)
            question_id += 1
            inserted_count += 1

        return {
            "statusCode": 200,
            "body": json.dumps({"message": f"{inserted_count} questions inserted successfully."})
        }

        # return {
        #     "statusCode": 200,
        #     "headers": {
        #         "Content-Type": "text/plain"
        #     },
        #     "body": final
        # }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }