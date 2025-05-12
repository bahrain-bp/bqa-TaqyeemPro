const { Stack, Duration } = require('aws-cdk-lib');

const lambda = require('aws-cdk-lib/aws-lambda');

const iam = require('aws-cdk-lib/aws-iam');

const apigateway = require('aws-cdk-lib/aws-apigateway');

const sfn = require('aws-cdk-lib/aws-stepfunctions');

const tasks = require('aws-cdk-lib/aws-stepfunctions-tasks');

const dynamodb = require('aws-cdk-lib/aws-dynamodb');
 
class TaqyeemProStacktest extends Stack {

  constructor(scope, id, props) {

    super(scope, id, props);
 
    const bucketName = 'taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit';

    const tableName = 'ExamQuestions';
 
    // ✅ Main long-running Lambda (Nova)

    const PythonLambda = new lambda.Function(this, "PythonLambda", {

      code: lambda.Code.fromAsset("lambda"),

      runtime: lambda.Runtime.PYTHON_3_11,

      handler: "nova_bedrock.lambda_bedrock",

      timeout: Duration.minutes(15),

      environment: {

        BUCKET_NAME: bucketName,

        TABLE_NAME: tableName,

      },

    });
 
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: [

        'bedrock:InvokeModel',

        'bedrock:InvokeModelWithResponseStream'

      ],

      resources: [

        'arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1*'

      ]

    }));
 
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: ['s3:GetObject', 's3:ListBucket'],

      resources: [

        `arn:aws:s3:::${bucketName}`,

        `arn:aws:s3:::${bucketName}/*`

      ]

    }));
 
    PythonLambda.addToRolePolicy(new iam.PolicyStatement({

      actions: ['dynamodb:PutItem'],

      resources: [`arn:aws:dynamodb:${this.region}:${this.account}:table/${tableName}`]

    }));
 
    const fitzLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'PyMuPDFLayer',

      'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p311-PyMuPDF:9'

    );

    PythonLambda.addLayers(fitzLayer);
 
    // ✅ Step Function definition (single task)

    const novaStep = new tasks.LambdaInvoke(this, 'InvokeNovaLambda', {

      lambdaFunction: PythonLambda,

      timeout: Duration.minutes(15),

      outputPath: '$.Payload'

    });
 
    const stateMachine = new sfn.StateMachine(this, 'NovaExamStateMachine', {

      definition: novaStep,

      timeout: Duration.minutes(15)

    });
 
    // ✅ Lambda to trigger Step Function

    const triggerStepLambda = new lambda.Function(this, "TriggerStepLambda", {

      code: lambda.Code.fromAsset("lambda"),

      runtime: lambda.Runtime.PYTHON_3_11,

      handler: "start_step.lambda_handler",

      timeout: Duration.seconds(10),

      environment: {

        STEP_FUNCTION_ARN: stateMachine.stateMachineArn

      }

    });
 
    stateMachine.grantStartExecution(triggerStepLambda);
 
    // ✅ API Gateway integration

    const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {

      restApiName: 'TaqyeemPro Service',

    });
 
    const Invoke = api.root.addResource("invokeFunction");

    Invoke.addMethod("POST", new apigateway.LambdaIntegration(triggerStepLambda));

  }

}
 
module.exports = { TaqyeemProStacktest };

 