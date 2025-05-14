const { Stack, Duration } = require('aws-cdk-lib');

const lambda = require('aws-cdk-lib/aws-lambda');

const iam = require('aws-cdk-lib/aws-iam');

const apigateway = require('aws-cdk-lib/aws-apigateway');

const dynamodb = require('aws-cdk-lib/aws-dynamodb');
 
class Stacktestnew extends Stack {

  constructor(scope, id, props) {

    super(scope, id, props);
 
    const bucketName = 'taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit';

    const tableName = 'ExamQuestionsTesting';
 
    // ✅ Main long-running Lambda (Nova)

    const NewLambda = new lambda.Function(this, "NewLambda", {

      code: lambda.Code.fromAsset("lambda"),

      runtime: lambda.Runtime.PYTHON_3_11,

      handler: "newlambda.lambda_handler",

      timeout: Duration.minutes(15),

      environment: {

        BUCKET_NAME: bucketName,

        TABLE_NAME: tableName,

      },

    });
 
    NewLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: [

        'bedrock:InvokeModel',

        'bedrock:InvokeModelWithResponseStream'

      ],

      resources: [

        'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0',
        'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',

      ]

    }));
 
    NewLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: ['s3:GetObject', 's3:ListBucket'],

      resources: [

        `arn:aws:s3:::${bucketName}`,

        `arn:aws:s3:::${bucketName}/*`

      ]

    }));
 
    NewLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: ['dynamodb:PutItem'],

      resources: [`arn:aws:dynamodb:${this.region}:${this.account}:table/${tableName}`]

    }));
 
    const fitzLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'PyMuPDFLayer',

      'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p311-PyMuPDF:9'

    );

    NewLambda.addLayers(fitzLayer);
 
    // ✅ API Gateway integration

    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {

      restApiName: 'TaqyeemPro Service',

    });
 
    const Invoke = api.root.addResource("invokeNewFunction");

    Invoke.addMethod("POST", new apigateway.LambdaIntegration(NewLambda));

    const TestInvoke = api.root.addResource("testInvoke");

    TestInvoke.addMethod("POST", new apigateway.LambdaIntegration(NewLambda));

  }

}
 
module.exports = { Stacktestnew };