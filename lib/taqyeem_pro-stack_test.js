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
        environment: {
          BUCKET_NAME: 'taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit',
          TABLE_NAME: 'ExamQuestionsTesting'
      }
    });

    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
    actions: [
      'bedrock:InvokeModel',
      'bedrock:InvokeModelWithResponseStream' // Add streaming permission
    ],
    resources: [
      'arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1*', // Wildcard for all versions
      'arn:aws:bedrock:us-east-1:666053140928:provisioned-model/*' // Add provisioned models if needed
    ]
    }));

    // Permission to read from S3 (replace with your actual bucket name)
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        's3:ListBucket', 
        's3:GetObject'
      ],
      resources: [
        'arn:aws:s3:::taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit',          // For ListBucket
        'arn:aws:s3:::taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit/*'         // For GetObject
      ]
    }));

    const fitzLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'FitzLayer',
      'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p311-PyMuPDF:9' //use this arn for PyMuPDF it is from "https://github.com/keithrozario/Klayers?tab=readme-ov-file#list-of-arns"
    );
    
    PythonLambda.addLayers(fitzLayer);

    // const examQuestionsTable = dynamodb.Table.fromTableAttributes(this, 'ExamQuestionsTable', {
    //   tableName: 'ExamQuestions'
    // });
    
    // // Lambda to insert questions into DynamoDB
    // const InsertLambda = new lambda.Function(this, "InsertLambda", {
    //   functionName: "ExamQuestionsWriter", // Add this line
    //   code: lambda.Code.fromAsset("lambda"),
    //   runtime: lambda.Runtime.PYTHON_3_11,
    //   handler: "store_q.lambda_storeQ",
    //   timeout: Duration.seconds(300),
    //   environment: {
    //     TABLE_NAME: 'ExamQuestions'
    //   }
    // });

    // const examGenerationLambda = new lambda.Function(this, 'ExamGenerationFunction', {
    //   runtime: lambda.Runtime.PYTHON_3_11,
    //   handler: 'ExamGeneration.handler', // file is ExamGeneration.js, function is handler
    //   code: lambda.Code.fromAsset('lambda'), // path to lambda folder
    //   environment: {
    //     TABLE_NAME: 'ExamQuestions', // optional, if you want to use environment variable
    //   },
    // });

    // Give permission to Lambda to write into ExamQuestions table
    const examQuestionsTable = dynamodb.Table.fromTableName(this, 'ImportedExamQuestionsTable', 'ExamQuestionsTesting');
    examQuestionsTable.grantWriteData(PythonLambda);
  
    // examQuestionsTable.grantWriteData(InsertLambda);
    // InsertLambda.grantInvoke(PythonLambda);

    // // Permissions to write to DynamoDB
    // InsertLambda.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['dynamodb:PutItem'],
    //   resources: ['arn:aws:dynamodb:*:*:table/ExamQuestions']
    // }));


    // PythonLambda.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['lambda:InvokeFunction'],
    //   resources: [InsertLambda.functionArn] // ARN of ExamGeneration Lambda
    // }));

        // API Gateway 
    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {
        restApiName: 'TaqyeemPro Service',
    });

    const invoke = api.root.addResource("invoke");
    invoke.addMethod("POST", new apigateway.LambdaIntegration(PythonLambda)); // POST /invoke triggers the prompt generation

    // const generateResource = api.root.addResource('generate-questions');
    // generateResource.addMethod('POST', new apigateway.LambdaIntegration(PythonLambda, {
    //   proxy: true,
    //   allowTestInvoke: true
    // }));

    // Create a new /add-question resource under API
    // const addQuestionResource = api.root.addResource('add-question');
    // addQuestionResource.addMethod('POST', new apigateway.LambdaIntegration(InsertLambda));

    // const generateResource = api.root.addResource('generate-questions');
    // generateResource.addMethod('POST', new apigateway.LambdaIntegration(PythonLambda, {
    //   proxy: true,
    //   allowTestInvoke: true
    // }));

    // Add to both Lambda roles
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['logs:*'],
      resources: ['*']
    }));

  }
}

module.exports = { TaqyeemProStacktest };