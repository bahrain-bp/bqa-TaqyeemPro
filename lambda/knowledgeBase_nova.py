import boto3
import random
import string
import json
import re
from decimal import Decimal
#new code that uses Knowledge base instead of the previous manual extraction of curriclm data from s3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ExamQuestionsTesting')
bedrock_runtime = boto3.client("bedrock-runtime")

def lambda_KB_bedrock(event, context):
    try:
        request_body = json.loads(event.get('body', '{}'))
        grade = int(request_body.get('grade', 0))
        subject = request_body.get('subject', '').strip()
        language = request_body.get('language', '').strip()
        mcq = int(request_body.get('mcq', 0))
        tf = int(request_body.get('tf', 0))
        short = int(request_body.get('short', 0))

        validation_errors = []
        if not subject:
            validation_errors.append("Subject is required")
        if grade < 1 or grade > 12:
            validation_errors.append("Grade must be between 1 and 12")
        if mcq < 0 or tf < 0 or short < 0:
            validation_errors.append("Question counts cannot be negative")

        total_questions = mcq + tf + short
        if total_questions <= 0:
            validation_errors.append("At least one question type must have a positive count")

        if validation_errors:
            return {
                "statusCode": 400,
                "body": json.dumps({"errors": validation_errors})
            }

        # Prompt remains unchanged
        prompt = (
            f"You are a specialized question generation system for {subject}, strictly adhering to provided test specifications "
            "and mirroring the patterns in sample questions.\n\n"
            f"Generate {mcq} multiple choice, {tf} true/false, {short} short answer questions, total of {total_questions} original questions that perfectly match these requirements:\n\n"
            "Specifications:\n"
            "1. Content Requirements:\n"
            f"   - Language of questions must be: {language}\n"
            "   - All specified skills must be represented in every question type\n"
            "   - Question Types: Maintain exact ratio of MCQs/T/F/Short Answer from specifications\n"
            "   - Difficulty: Align with difficulty level\n\n"
            "2. Technical Requirements:\n"
            "   - Strictly text-based (no images/diagrams)\n"
            "   - Avoid opinion-based/ambiguous questions\n"
            "   - Avoid the questions thats rely on images, graphs or charts\n"
            "   - Prevent duplicate concepts with existing questions\n\n"
            "Format Requirements:\n"
            "1. JSON Structure:\n"
            "[{\n"
            "  \"questionText\": \"Clear question...no equations here only text\",\n"
            "  \"equation\": \"a/b\",\n"
            "  \"skillType\": \"skill from specifications\",\n"
            "  \"questionType\": \"MCQ/T/F/Short answer\",\n"
            "  \"answerText\": \"Unambiguous correct answer\",\n"
            "  \"option1\": \"op1\",\n"
            "  \"option2\": \"op2\",\n"
            "  \"option3\": \"op3\",\n"
            "  \"option4\": \"op4\"\n"
            "}]\n\n"
            "Field Rules:\n"
            "   - For T/F: options {\"A\": \"True\", \"B\": \"False\"}\n"
            "   - Short Answers: \"options\" = empty object\n"
            "   - MCQs: Exactly 4 distinct plausible options\n"
            "   - answerText: Must EXACTLY match correct option text\n\n"
            "Validation Checks:\n"
            "1. Ensure:\n"
            "   - coverage of all specified skills\n"
            "   - Correct question type distribution\n"
            "   - No markdown/LaTeX outside equations\n"
            "   - Trimmed whitespace in all fields\n\n"
            "Output Instructions:\n"
            "1. Generate ONLY raw JSON - no commentary\n"
            "2. Validate against schema before returning\n"
            "3. Maintain consistent difficulty curve\n"
            "4. Ensure JSON is COMPLETE and WELL-FORMED. Do NOT truncate the output. Finish all arrays and objects.\n"
        )

        # Bedrock KB-based generation
        body = {
            "input": prompt,
            "retrieveAndGenerateConfiguration": {
                "type": "KNOWLEDGE_BASE",
                "knowledgeBaseConfiguration": {
                    "knowledgeBaseId": "OZO0ZQ1PXP",
                    "modelArn": "arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1:0"
                },
                "generationConfiguration": {
                    "maxTokens": 2048,
                    "temperature": 0.7
                }
            }
        }

        response = bedrock_runtime.invoke_model(
            modelId="amazon.nova-pro-v1:0",
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        response_body = json.loads(response['body'].read())
        output = response_body.get("output", {}).get("text", "No output returned")

        cleaned_output = re.sub(r"^```json|```$", "", output.strip(), flags=re.IGNORECASE).strip()
        questions = json.loads(cleaned_output)

        # Save to DynamoDB
        key = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
        question_id = 1
        inserted_count = 0

        for q in questions:
            item = {
                "QuestionId": f"{key}_Q{question_id}",
                "Subject_grade": f"{subject}_{grade}",
                "language": language,
                "subject": subject,
                "grade": grade,
                "questionText": q["questionText"],
                "questionType": q["questionType"],
                "answerText": q["answerText"],
                "mark": Decimal("1"),
                "approved": False,
                "skillType": q["skillType"],
                "equation": q.get("equation", "").replace('\\', '\\\\')
            }

            if q["questionType"].lower() == "mcq":
                item["option1"] = q.get("option1", "")
                item["option2"] = q.get("option2", "")
                item["option3"] = q.get("option3", "")
                item["option4"] = q.get("option4", "")
            elif q["questionType"].lower() == "t/f":
                item["option1"] = "True"
                item["option2"] = "False"

            table.put_item(Item=item)
            question_id += 1
            inserted_count += 1

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": f"{inserted_count} questions generated and stored successfully.",
                "sample_question": questions
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

