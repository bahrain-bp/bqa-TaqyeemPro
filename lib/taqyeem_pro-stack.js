const { Stack, CfnOutput } = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const lambda = require('aws-cdk-lib/aws-lambda');
const origins = require('aws-cdk-lib/aws-cloudfront-origins');
const cdk = require('aws-cdk-lib');

class TaqyeemProStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Lambda
    const myFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello World!'),
          };
        };
      `),
    });

    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, 'myFunctionUrlOutput', {
      value: myFunctionUrl.url,
    });

    // Create ExamGeneration Lambda function
    const examGenerationLambda = new lambda.Function(this, 'ExamGenerationFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'ExamGeneration.handler', // file is ExamGeneration.js, function is handler
      code: lambda.Code.fromAsset('lambda'), // path to lambda folder
      environment: {
        TABLE_NAME: 'ExamQuestions', // optional, if you want to use environment variable
      },
    });

    // Create viewQuestions Lambda function
    const viewQuestionsLambda = new lambda.Function(this, 'ViewQuestionsFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'ViewQuestions.handler', 
      code: lambda.Code.fromAsset('lambda'), 
      environment: {
        TABLE_NAME: 'ExamQuestions', 
      },
    });

    // Give permission to Lambda to write into ExamQuestions table
    const examQuestionsTable = dynamodb.Table.fromTableName(this, 'ImportedExamQuestionsTable', 'ExamQuestions');
    examQuestionsTable.grantWriteData(examGenerationLambda);

    const viewQuestionsTable = dynamodb.Table.fromTableName(this, 'ImportedExamQuestionsTable_Read', 'ExamQuestions');
    viewQuestionsTable.grantReadData(viewQuestionsLambda);

    // S3 Bucket
    const bucket = new s3.Bucket(this, 'TaqyeemProBucket', {
      versioned: true,
      publicReadAccess: false,
    });

    // CloudFront Distribution
    new cloudfront.Distribution(this, 'TaqyeemProDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
      },
    });

    // DynamoDB Table
    new dynamodb.Table(this, 'TaqyeemProTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // API Gateway 
    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {
      restApiName: 'TaqyeemPro Service',
    });

    const items = api.root.addResource('items');
    items.addMethod('GET', new apigateway.MockIntegration({
      integrationResponses: [{
        statusCode: "200",
        responseTemplates: {
          'application/json': '[{"id": "1", "name": "example"}]',
        },
      }],
      requestTemplates: {
        'application/json': '{"statusCode": 200}',
      },
    }), {
      methodResponses: [{ statusCode: "200" }],
    });

    // Create a new /add-question resource under API
    const addQuestionResource = api.root.addResource('add-question');

    // Add a POST method to /add-question connected to the ExamGeneration Lambda
    addQuestionResource.addMethod('POST', new apigateway.LambdaIntegration(examGenerationLambda));

    const viewQuestionResource = api.root.addResource('view-question');
    viewQuestionResource.addMethod('GET', new apigateway.LambdaIntegration(viewQuestionsLambda));

  }
}

module.exports = { TaqyeemProStack };
