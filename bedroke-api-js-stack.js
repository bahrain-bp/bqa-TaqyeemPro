const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const iam = require('aws-cdk-lib/aws-iam');
const path = require('path');

class BedrockApiJsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Lambda Function
    const bedrockLambda = new lambda.Function(this, 'BedrockLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        BEDROCK_MODEL_ID: 'anthropic.claude-v2',
        REGION: 'us-east-1'
      },
      timeout: Duration.seconds(30)
    });

    // IAM Permissions to use Bedrock
    bedrockLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        "bedrock:InvokeModel"
      ],
      resources: ["*"]
    }));

    // API Gateway
    const api = new apigateway.LambdaRestApi(this, 'BedrockApi', {
      handler: bedrockLambda,
      proxy: false
    });

    const invoke = api.root.addResource('invoke');
    invoke.addMethod('POST'); // POST /invoke
  }
}

module.exports = { BedrockApiJsStack };
