import fitz  # PyMuPDF
import random
import string
import json
import boto3
import re
from decimal import Decimal
import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestions')


def lambda_bedrock(event, context):
    try:
        # Parse input from API Gateway
        try:
            request_body = event

            # Validate and extract parameters
            errors = []
            try:
                grade = int(request_body.get('grade', 0))
            except (TypeError, ValueError):
                errors.append("Grade must be a valid integer.")

            subject = request_body.get('subject', '').strip()
            if not subject:
                errors.append("Subject is required.")

            language = request_body.get('language', '').strip()
            if not language:
                errors.append("Language is required.")

            file_key = request_body.get('file_key', '').strip()
            if not file_key:
                errors.append("file_key is required.")

            try:
                quesions = int(request_body.get('quesions', 0))
            except (TypeError, ValueError):
                errors.append("quesions must be a valid integer.")

            if errors:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"errors": errors})
                }

            if quesions <= 0:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": "quesions must be a positive integer."})
                }

            # Calculate question types
            mcq = max(int(quesions / 3), 0)
            tf = max(int(quesions / 3), 0)
            short = max(int(quesions / 3), 0)
            total_int = mcq + tf + short
            remaning = quesions - total_int
            if remaning > 0:
                mcq += remaning

            if mcq < 0 or tf < 0 or short < 0:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": "Question counts cannot be negative."})
                }

        except Exception as e:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": f"Invalid input: {str(e)}"})
            }

        # Initialize S3 client
        s3 = boto3.client('s3')
        bucket_name = "taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit"

        # Get PDF from S3
        try:
            response = s3.get_object(Bucket=bucket_name, Key=file_key)
            pdf_content = response['Body'].read()
        except Exception as e:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": f"Failed to fetch PDF from S3: {str(e)}"})
            }

        # Process PDF from bytes
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            extracted_text = ""
            for page in doc:
                extracted_text += page.get_text()
            doc.close()
        except Exception as e:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": f"Failed to extract text from PDF: {str(e)}"})
            }

        # Build prompt for Bedrock
        prompt = (
            f"You are a specialized question generation system for {subject} subject,"
            f"Generate {mcq} MCQ, {tf} True or False, {short} Short Answer questions, total of {quesions} questions that perfectly match these requirements:\n\n"
            "Specifications:\n"
            "1. Content Requirements:\n"
            f"   - Language of questionText only must be: {language}\n"
            "   - All specified skills must be represented in every question type\n"
            "   - Question Types: Maintain exact ratio of MCQs/T/F/Short Answer from specifications\n"
            "   - Difficulty: Align with difficulty level\n\n"
            "2. Technical Requirements:\n"
            "   - Strictly text-based questions (no images/diagrams)\n"
            "   - Avoid the questions thats rely on images, graphs or charts\n"
            "   - Write only questions that related to the subject\n"
            "Format Requirements:\n"
            "1. JSON Structure:\n"
            "[{\n"
            "  \"questionText\": \"Clear question text without equations\",\n"
            "  \"equation\": \"24+543 or empty if no equation needed\",\n"
            "  \"skillType\": \"skill from specifications all in lowercase\",\n"
            "  \"questionType\": \"MCQ - True or False - Short Answer\",\n"
            "  \"answerText\": \"Unambiguous correct answer\",\n"
            "  \"option1\": \"op1\",\n"
            "  \"option2\": \"op2\",\n"
            "  \"option3\": \"op3\",\n"
            "  \"option4\": \"op4\"\n"
            "  }\n"
            "}]\n"
            "\n\n"
            "2. Field Rules:\n"
            "   - For True or False: options {\"A\": \"True\", \"B\": \"False\"}\n"
            "   - Short Answers: \"options\" = empty object\n"
            "   - MCQs: Exactly 4 distinct plausible options\n"
            "   - answerText: Must EXACTLY match correct option text\n"
            "   - Equation: only math equations (no text)\n\n"
            "Validation Checks:\n"
            "1. Ensure:\n"
            "   - coverage of all specified skills\n"
            "   - Correct question type distribution\n"
            "   - No markdown/LaTeX for equations\n"
            "   - Trimmed whitespace in all fields\n\n"
            "Output Instructions:\n"
            "1. Generate ONLY raw JSON - no commentary\n"
            "2. Validate against schema before returning\n"
            "3. Ensure JSON is COMPLETE and WELL-FORMED. Do NOT truncate the output. Finish all arrays and objects.\n\n"
            "The test specifications Content:\n"
            f"{extracted_text.strip()}\n\n"
        )

        # Call Nova Pro model on Bedrock
        bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-1")
        body = {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}]
                }
            ],
            "inferenceConfig": {
                "max_new_tokens": 5000
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

        # Clean up model output
        cleaned_output = re.sub(r'^```json|```$', '', output.strip(), flags=re.IGNORECASE | re.MULTILINE)
        cleaned_output = cleaned_output.strip()

        try:
            final = json.loads(cleaned_output)
        except json.JSONDecodeError as e:
            return {
                "statusCode": 500,
                "body": json.dumps({"error": f"Invalid JSON format from model: {str(e)}"})
            }

        # Insert questions into DynamoDB
        key = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
        question_id = 1
        inserted_count = 0

        for q in final:
            item = {
                "QuestionId": f"{key}_Q{question_id}",
                "Subject_grade": f"{subject}_{grade}",
                "language": language,
                "subject": subject,
                "grade": grade,
                "date & time": (datetime.datetime.utcnow() + datetime.timedelta(hours=3)).isoformat(),
                "questionText": q.get("questionText", ""),
                "questionType": q.get("questionType", ""),
                "answerText": q.get("answerText", ""),
                "mark": Decimal("1"),
                "approved": False,
                "skillType": q.get("skillType", "").lower(),
                "equation": q.get("equation", "").replace('\\', '\\\\')
            }

            question_type = q.get("questionType", "").strip().lower()
            if question_type == "mcq":
                item.update({
                    "option1": q.get("option1", ""),
                    "option2": q.get("option2", ""),
                    "option3": q.get("option3", ""),
                    "option4": q.get("option4", "")
                })
            elif question_type in ["t/f", "true or false", "True or False"]:
                item.update({
                    "option1": q.get("option1", "True"),
                    "option2": q.get("option2", "False")
                })
            # Short answers: no options

            table.put_item(Item=item)
            question_id += 1
            inserted_count += 1

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": f"{inserted_count} questions generated and stored successfully.",
                "sample_question": final}
            )
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