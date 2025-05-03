const { Stack, Duration } = require('aws-cdk-lib');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('aws-cdk-lib/aws-iam');
const path = require('path');

class TaqyeemProStacktest extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const PythonLambda = new lambda.Function(this, "PythonLambda", {
        code: lambda.Code.fromAsset("lambda"),
        runtime: lambda.Runtime.PYTHON_3_11,        
        handler: "bedrock.lambda_bedrock",
        timeout: Duration.seconds(60),
    });

    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
    actions: ['bedrock:InvokeModel'],
    resources: ["arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-premier-v1:0"] //replace with whatever model we are using i.e amazon.nova-pro-v1:0

}));

    // Permission to read from S3 (replace with your actual bucket name)
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: ['arn:aws:s3:::testingbedrockuploadpdf/*']
    }));

    const layer = lambda.LayerVersion.fromLayerVersionArn(this, 'PyMuPDFLayer',
      'arn:aws:lambda:us-east-1:666053140928:layer:PyMuPDF-Layer:1' // replace with your actual ARN
    );
    
    PythonLambda.addLayers(layer);
    
        // API Gateway 
    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {
        restApiName: 'TaqyeemPro Service',
    });

    const invoke = api.root.addResource("invoke");
    invoke.addMethod("POST", new apigateway.LambdaIntegration(PythonLambda)); // POST /invoke triggers the prompt generation
  }
}

module.exports = { TaqyeemProStacktest };