const { Stack, Duration } = require('aws-cdk-lib');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('aws-cdk-lib/aws-iam');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');

class TaqyeemProStacktest extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const PythonLambda = new lambda.Function(this, "PythonLambda", {
        code: lambda.Code.fromAsset("lambda"),
        runtime: lambda.Runtime.PYTHON_3_11,        
        handler: "nova_bedrock.lambda_bedrock",
        timeout: Duration.seconds(900),
    });

    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
    actions: ['bedrock:InvokeModel'],
    resources: ["arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1:0"] //replace with whatever model we are using i.e amazon.nova-pro-v1:0

    }));

    // Permission to read from S3 (replace with your actual bucket name)
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        's3:ListBucket', 
        's3:GetObject'
      ],
      resources: [
        'arn:aws:s3:::testingbedrockuploadpdf',          // For ListBucket
        'arn:aws:s3:::testingbedrockuploadpdf/*'         // For GetObject
      ]
    }));

    const fitzLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'FitzLayer',
      'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p311-PyMuPDF:9' //use this arn for PyMuPDF it is from "https://github.com/keithrozario/Klayers?tab=readme-ov-file#list-of-arns"
    );
    
    PythonLambda.addLayers(fitzLayer);

    // 1. Reference EXISTING table first
    const examQuestionsTable = dynamodb.Table.fromTableName(
      this, 
      'ExamQuestionsTable',
      'ExamQuestions' // Existing table name
    );
    
    // Lambda to insert questions into DynamoDB
    const InsertLambda = new lambda.Function(this, "InsertLambda", {
      functionName: "ExamQuestions", // Add this line
      code: lambda.Code.fromAsset("lambda"),
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: "questions.lambda_storeQ",
      timeout: Duration.seconds(300),
      environment: {
        TABLE_NAME: 'ExamQuestions',
      }
    });

    examQuestionsTable.grantWriteData(InsertLambda);

    // Permissions to write to DynamoDB
    InsertLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['dynamodb:PutItem'],
      resources: ['arn:aws:dynamodb:*:*:table/ExamQuestions']
    }));

    InsertLambda.grantInvoke(PythonLambda);

    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['lambda:InvokeFunction'],
      resources: [InsertLambda.functionArn] // ARN of ExamGeneration Lambda
    }));

        // API Gateway 
    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {
        restApiName: 'TaqyeemPro Service',
    });

    const invoke = api.root.addResource("invoke");
    invoke.addMethod("POST", new apigateway.LambdaIntegration(PythonLambda)); // POST /invoke triggers the prompt generation

    // Create a new /add-question resource under API
    const addQuestionResource = api.root.addResource('add-question');
    addQuestionResource.addMethod('POST', new apigateway.LambdaIntegration(InsertLambda));

  }
}

module.exports = { TaqyeemProStacktest };