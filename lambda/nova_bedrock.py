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
            # Get parameters from request body
            # request_body = json.loads(event.get('body', '{}'))
            request_body = event

            grade = int(request_body.get('grade', 0))
            subject = request_body.get('subject', '').strip()
            language = request_body.get('language', '').strip()
            file_key = request_body.get('file_key', '').strip()
            quesions = int(request_body.get('quesions', 0))


            # mcq = int(request_body.get('mcq', 0))
            # tf = int(request_body.get('tf', 0))
            # short = int(request_body.get('short', 0))
            
            # grade = 12
            # subject = "Math"
            # language = "English"

            mcq = int(quesions/3)
            tf = int(quesions/3)
            short = int(quesions/3)


            total_int = int(mcq + tf + short)
            remaning = int(quesions - total_int)

            if remaning > 0 :
                mcq += remaning


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
        if grade != 1 or grade != 12:
            validation_errors.append("Grade must be 1 or 12")
        if mcq < 0 or tf < 0 or short < 0:
            validation_errors.append("Question counts cannot be negative")

        if validation_errors:
            return {
                "statusCode": 400,
                "body": json.dumps({"errors": validation_errors})
            }

        # total_questions = int(quesions)
        #total_questions = mcq + tf + short
        if quesions <= 0:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "At least one question type must have a positive count"})
            }

        # Initialize S3 client
        s3 = boto3.client('s3')
        
        # S3 bucket and file details
        bucket_name = "taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit"
        #file_key = "G"+str(grade)+"-"+subject+".pdf"
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
            f"You are a specialized question generation system for {subject} subject,"

            f"Generate {mcq} multiple choice, {tf} true/false, {short} short answer questions, total of {quesions} questions that perfectly match these requirements:\n\n"

            "Specifications:\n"
            "1. Content Requirements:\n"
            f"   - Language of questions must be: {language}\n"
            "   - All specified skills must be represented in every question type\n"
            "   - Question Types: Maintain exact ratio of MCQs/T/F/Short Answer from specifications\n"
            "   - Difficulty: Align with difficulty level\n\n"

            "2. Technical Requirements:\n"
            "   - Strictly text-based (no images/diagrams)\n"
            #   - LaTeX equations ONLY for formulas\n"
            #   - Avoid opinion-based/ambiguous questions\n"
            "   - Avoid the questions thats rely on images, graphs or charts\n"
            #   - Prevent duplicate concepts with existing questions\n\n"

            "Format Requirements:\n"
            "1. JSON Structure:\n"
            "[{{\n"
            "  \"questionText\": \"Clear question...no equations here only text\",\n"
            #  \"latexEquation\": \"\\\\frac{{a}}{{b}}\",\n"
            "  \"equation\": \"a/b\",\n"
            "  \"skillType\": \"skill from specifications\",\n"
            "  \"questionType\": \"MCQ/T/F/Short answer\",\n"
            "  \"answerText\": \"Unambiguous correct answer\",\n"
            "  \"option1\": \"op1\",\n"
            "  \"option2\": \"op2\",\n"
            "  \"option3\": \"op3\",\n"
            "  \"option4\": \"op4\",\n"
            "  }}\n"
            "}}]\n"
            "\n\n"

            "2. Field Rules:\n"
            "   - For T/F: options {{\"A\": \"True\", \"B\": \"False\"}}\n"
            "   - Short Answers: \"options\" = empty object\n"
            "   - MCQs: Exactly 4 distinct plausible options\n"
            "   - answerText: Must EXACTLY match correct option text\n\n"

            "Validation Checks:\n"
            "1. Ensure:\n"
            "   - coverage of all specified skills\n"
            "   - Correct question type distribution\n"
            "   - No markdown/LaTeX outside equations\n"
            #   - Valid JSON escaping (\\\\ for LaTeX)\n"
            "   - Trimmed whitespace in all fields\n\n"

            "Output Instructions:\n"
            "1. Generate ONLY raw JSON - no commentary\n"
            "2. Validate against schema before returning\n"
            #3. Maintain consistent difficulty curve\n"
            "3. Ensure JSON is COMPLETE and WELL-FORMED. Do NOT truncate the output. Finish all arrays and objects.\n\n"

            # "Examples:\n"
            # "[\n"
            # "  {{\n"
            # "    \"questionText\": \"Clear question stem...\",\n"
            # "    \"latexEquation\": \"\\\\frac{{a}}{{b}} (if required)\",\n"
            # "    \"skillType\": \"Exact skill from specifications\",\n"
            # "    \"questionType\": \"MCQ\",\n"
            # "    \"answerText\": \"MCQ content...\",\n"
            # "    \"options\": {{\n"
            # "      \"A\": \"MCQ content...\",\n"
            # "      \"B\": \"...\",\n"
            # "      \"C\": \"...\",\n"
            # "      \"D\": \"...\"\n"
            # "    }}\n"
            # "  }}\n"
            # "]\n\n"

            "The test specifications Content:\n"
            f"{extracted_text.strip()}\n\n"
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
        
        # fixxxx = re.sub(r'(?<!\\)\\(?![\\ntr"])', r'\\\\', s, output.strip(), flags=re.IGNORECASE)
        
        # cleaned_output = re.sub(r"^```json\s*|\s*```$", "", output.strip(), flags=re.IGNORECASE)
        
        cleaned_output = re.sub(r'^```json|```$', '', output.strip(), flags=re.IGNORECASE | re.MULTILINE)
        cleaned_output = cleaned_output.strip()

        # try:
        final = json.loads(cleaned_output)
        # except json.JSONDecodeError as e:
        #     try:
        #         # Attempt basic repairs
        #         if not cleaned_output.endswith(']') and cleaned_output.startswith('['):
        #             cleaned_output += ']'
        #         elif not cleaned_output.endswith('}') and cleaned_output.startswith('{'):
        #             cleaned_output += '}'
        #         # Remove trailing commas
        #         cleaned_output = re.sub(r',\s*(?=[]}])', '', cleaned_output)
        #         final = json.loads(cleaned_output)
        #     except json.JSONDecodeError:
        #         raise RuntimeError(f"Invalid JSON format from model: {str(e)}")
                
        # print("vfetbtrgn: ",cleaned_output)
                
        # print(" . . . ., ", final)

        
        # json_string = output.replace('json', '').strip()  
        
        # cleaned_json = json_string.strip()
        
        # cleaned_loads = json.loads(cleaned_json)
        
        # print("cleaned_loads: ",cleaned_loads) 
        

        # Insert questions into DynamoDB
        key = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
        question_id = 100
        inserted_count = 0
        dateTime = datetime.datetime.now()

        for q in final:
            # Create base item
            item = {
                "QuestionId": f"{key}_Q{question_id}",
                "Subject_grade": f"{subject}_{grade}",
                "language": language,
                "subject": subject,
                "grade": grade,
                "date & time": dateTime,
                "questionText": q["questionText"],
                "questionType": q["questionType"],
                "answerText": q["answerText"],
                "mark": Decimal("1"),
                "approved": False,
                "skillType": q["skillType"],
                "equation": q.get("equation", "").replace('\\', '\\\\')
            }

            # Handle options based on question type
            question_type = q["questionType"].lower()
            if question_type == "mcq":
                item.update({
                    "option1": q.get("option1", ""),
                    "option2": q.get("option2", ""),
                    "option3": q.get("option3", ""),
                    "option4": q.get("option4", "")
                })
            elif question_type == "t/f":
                item.update({
                    "option1": q.get("option1", "True"),
                    "option2": q.get("option2", "False")
                })
            # Short answers get no options

            # Put item in DynamoDB
            table.put_item(Item=item)
            question_id += 1
            inserted_count += 1

            # Try to get pre-formed options list first
            # if q["QuestionType"] == "MCQ":
            #     options = []
                
            #     # Collect options in order
            #     for i in range(1, 5):
            #         opt_key = f"option{i}"
            #         if opt_key in q:
            #             options.append(q[opt_key])
                
            #     # Ensure exactly 4 options
            #     if len(options) != 4:
            #         options = ["Missing option"] * 4
                
            #     # Store as comma-separated string
            #     item["options"] = ", ".join(options)

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