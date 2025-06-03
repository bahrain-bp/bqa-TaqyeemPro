// // Import necessary AWS CDK libraries
// const { Stack, CfnOutput, RemovalPolicy, Duration } = require("aws-cdk-lib");
// const cloudfront_origins = require("aws-cdk-lib/aws-cloudfront-origins");
// const s3 = require("aws-cdk-lib/aws-s3");
// const cloudfront = require("aws-cdk-lib/aws-cloudfront");
// const apigateway = require("aws-cdk-lib/aws-apigateway");
// const dynamodb = require("aws-cdk-lib/aws-dynamodb");
// const lambda = require("aws-cdk-lib/aws-lambda");
// const origins = require("aws-cdk-lib/aws-cloudfront-origins");
// const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
// const iam = require('aws-cdk-lib/aws-iam');
// const sfn = require('aws-cdk-lib/aws-stepfunctions');
// const tasks = require('aws-cdk-lib/aws-stepfunctions-tasks');


// class SingleStack extends Stack {
//   constructor(scope, id, props) {
//     super(scope, id, props);

//     // // ───────────────────────────────────────────────────────────────────────────────
//     // // DynamoDB Table for Exam Questions
//     // // ───────────────────────────────────────────────────────────────────────────────
//     // const examQuestionsTable = new dynamodb.Table(this, "ExamQuestions", {
//     //   partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
//     //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
//     //   removalPolicy: RemovalPolicy.RETAIN,
//     // });

//     const myFunctionUrl = myFunction.addFunctionUrl({
//       authType: lambda.FunctionUrlAuthType.NONE,
//     });

//     new CfnOutput(this, "myFunctionUrlOutput", {
//       value: myFunctionUrl.url,
//     });

//     // Exam Generation Lambda
//     const examGenerationLambda = new lambda.Function(this, "ExamGenerationFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "ExamGeneration.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         TABLE_NAME: examQuestionsTable.tableName,
//       },
//     });
//     examQuestionsTable.grantWriteData(examGenerationLambda);

//     // View Questions Lambda
//     const viewQuestionsLambda = new lambda.Function(this, "ViewQuestionsFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "ViewQuestions.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         TABLE_NAME: examQuestionsTable.tableName,
//       },
//     });
//     examQuestionsTable.grantReadData(viewQuestionsLambda);

//     // Update Question Lambda
//     const updateQuestionLambda = new lambda.Function(this, "UpdateQuestionFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "UpdateQuestion.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         TABLE_NAME: examQuestionsTable.tableName,
//       },
//     });
//     examQuestionsTable.grantWriteData(updateQuestionLambda);

//     // View Exams Lambda
//     const viewExamsLambda = new lambda.Function(this, "ViewExamsFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "ViewExams.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         TABLE_NAME: examQuestionsTable.tableName,
//       },
//     });
//     examQuestionsTable.grantReadData(viewExamsLambda);

//     // ───────────────────────────────────────────────────────────────────────────────
//     // S3 Buckets and CloudFront Distributions
//     // ───────────────────────────────────────────────────────────────────────────────

//     // General S3 Bucket and CloudFront Distribution
//     const bucket = new s3.Bucket(this, "TaqyeemProBucket", {
//       versioned: true,
//       publicReadAccess: false,
//     });

//     new cloudfront.Distribution(this, "TaqyeemProDistribution", {
//       defaultBehavior: {
//         origin: new origins.S3Origin(bucket),
//       },
//     });

//     // Static Web Hosting S3 Bucket
//     const s3StaticWebContent = new s3.Bucket(this, "TaqyeemPro-Web-Bucket", {
//       versioned: true,
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//       publicReadAccess: false,
//       removalPolicy: RemovalPolicy.RETAIN,
//     });

//     // Origin Access Identity for CloudFront
//     const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "TaqyeemProOAI");
//     s3StaticWebContent.grantRead(originAccessIdentity);

//     // CloudFront Distribution for static website
//     const staticSiteCDN = new cloudfront.Distribution(this, "TaqyeemProStaticWebCDN", {
//       defaultBehavior: {
//         origin: new cloudfront_origins.S3Origin(s3StaticWebContent, {
//           originAccessIdentity,
//         }),
//         viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
//       },
//       defaultRootObject: "index.html",
//       errorResponses: [
//         {
//           httpStatus: 403,
//           responseHttpStatus: 200,
//           responsePagePath: "/index.html",
//           ttl: Duration.seconds(0),
//         },
//         {
//           httpStatus: 404,
//           responseHttpStatus: 200,
//           responsePagePath: "/index.html",
//           ttl: Duration.seconds(0),
//         },
//       ],
//     });

//     new CfnOutput(this, "StaticSiteURL", {
//       value: `https://${staticSiteCDN.domainName}`,
//       description: "The CloudFront URL for the static website",
//     });

//     // Deploy frontend files and force refresh with timestamp
//     new s3deploy.BucketDeployment(this, "DeployWebsite", {
//       sources: [
//         s3deploy.Source.asset("./frontend/taqyeempro/dist"),
//         s3deploy.Source.data("timestamp.txt", new Date().toISOString()),
//       ],
//       destinationBucket: s3StaticWebContent,
//       distribution: staticSiteCDN,
//       distributionPaths: ["/*"],
//     });

//     // Curriculum Docs Bucket + Upload Lambda
//     const curriculumDocsBucket = new s3.Bucket(this, "CurriculumDocsBucket", {
//       versioned: true,
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//       encryption: s3.BucketEncryption.S3_MANAGED,
//       enforceSSL: true,
//       removalPolicy: RemovalPolicy.RETAIN,
//     });

//     // Lambda for generating presigned S3 upload URLs
//     const getUploadUrlLambda = new lambda.Function(this, "GetUploadUrlFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "GetUploadUrl.lambda_handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         BUCKET_NAME: curriculumDocsBucket.bucketName,
//       },
//     });
//     curriculumDocsBucket.grantPut(getUploadUrlLambda);

//     // Lambda for listing files in curriculum bucket
//     const listFilesLambda = new lambda.Function(this, "ListS3FilesFunction", {
//       runtime: lambda.Runtime.PYTHON_3_9,
//       handler: "ListS3Files.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       environment: {
//         BUCKET_NAME: curriculumDocsBucket.bucketName,
//       },
//     });
//     curriculumDocsBucket.grantRead(listFilesLambda);

//     // ───────────────────────────────────────────────────────────────────────────────
//     // API Gateway Setup
//     // ───────────────────────────────────────────────────────────────────────────────

//     const api = new apigateway.RestApi(this, "TaqyeemProAPI", {
//       restApiName: "TaqyeemPro Service",
//     });

//     // Route: POST /get-upload-url → GetUploadUrl Lambda
//     const uploadUrlResource = api.root.addResource("get-upload-url");
//     uploadUrlResource.addMethod(
//       "POST",
//       new apigateway.LambdaIntegration(getUploadUrlLambda)
//     );

//     // Route: GET /list-files → ListS3Files Lambda
//     const listFilesResource = api.root.addResource("list-files");
//     listFilesResource.addMethod(
//       "GET",
//       new apigateway.LambdaIntegration(listFilesLambda)
//     );

//     // Route: GET /items → Mock data for testing
//     const items = api.root.addResource("items");
//     items.addMethod(
//       "GET",
//       new apigateway.MockIntegration({
//         integrationResponses: [
//           {
//             statusCode: "200",
//             responseTemplates: {
//               "application/json": '[{"id": "1", "name": "example"}]',
//             },
//           },
//         ],
//         requestTemplates: {
//           "application/json": '{"statusCode": 200}',
//         },
//       }),
//       {
//         methodResponses: [{ statusCode: "200" }],
//       }
//     );

//     // Route: PUT /update-question → UpdateQuestion Lambda
//     const updateQuestionResource = api.root.addResource("update-question");
//     updateQuestionResource.addMethod(
//       "PUT",
//       new apigateway.LambdaIntegration(updateQuestionLambda)
//     );

//     // Route: POST /add-question → ExamGeneration Lambda
//     const addQuestionResource = api.root.addResource("add-question");
//     addQuestionResource.addMethod(
//       "POST",
//       new apigateway.LambdaIntegration(examGenerationLambda)
//     );

//     // Route: GET /view-exams → ViewExams Lambda
//     const viewExamsResource = api.root.addResource("view-exams");
//     viewExamsResource.addMethod(
//       "GET",
//       new apigateway.LambdaIntegration(viewExamsLambda)
//     );

//     // Route: GET /view-question → ViewQuestions Lambda
//     const viewQuestionResource = api.root.addResource("view-question");
//     viewQuestionResource.addMethod(
//       "GET",
//       new apigateway.LambdaIntegration(viewQuestionsLambda)
//     );

//     // ───────────────────────────────────────────────────────────────────────────────
//     // Nova Bedrock Integration
//     const bucketName = 'taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit';

//     const tableName = 'ExamQuestions';
 
//     // ✅ Main long-running Lambda (Nova)

//     const PythonLambda = new lambda.Function(this, "PythonLambda", {

//       code: lambda.Code.fromAsset("lambda"),

//       runtime: lambda.Runtime.PYTHON_3_11,

//       handler: "nova_bedrock.lambda_bedrock",

//       timeout: Duration.minutes(15),

//       environment: {

//         BUCKET_NAME: bucketName,

//         TABLE_NAME: tableName,

//       },

//     });
 
//     PythonLambda.addToRolePolicy(new iam.PolicyStatement({

//       actions: [

//         'bedrock:InvokeModel',

//         'bedrock:InvokeModelWithResponseStream'

//       ],

//       resources: [

//         'arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1*',
//         'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0',
//         'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',


//       ]

//     }));
 
//     PythonLambda.addToRolePolicy(new iam.PolicyStatement({

//       actions: ['s3:GetObject', 's3:ListBucket'],

//       resources: [

//         `arn:aws:s3:::${bucketName}`,

//         `arn:aws:s3:::${bucketName}/*`

//       ]

//     }));
 
//     PythonLambda.addToRolePolicy(new iam.PolicyStatement({

//       actions: ['dynamodb:PutItem'],

//       resources: [`arn:aws:dynamodb:${this.region}:${this.account}:table/${tableName}`]

//     }));
 
//     const fitzLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'PyMuPDFLayer',

//       'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p311-PyMuPDF:9'

//     );

//     PythonLambda.addLayers(fitzLayer);
 
//     // ✅ Step Function definition (single task)

//     const novaStep = new tasks.LambdaInvoke(this, 'InvokeNovaLambda', {

//       lambdaFunction: PythonLambda,

//       timeout: Duration.minutes(15),

//       outputPath: '$.Payload'

//     });
 
//     const stateMachine = new sfn.StateMachine(this, 'NovaExamStateMachine', {

//       definition: novaStep,

//       timeout: Duration.minutes(15)

//     });
 
//     // ✅ Lambda to trigger Step Function

//     const triggerStepLambda = new lambda.Function(this, "TriggerStepLambda", {

//       code: lambda.Code.fromAsset("lambda"),

//       runtime: lambda.Runtime.PYTHON_3_11,

//       handler: "start_step.lambda_handler",

//       timeout: Duration.seconds(10),

//       environment: {

//         STEP_FUNCTION_ARN: stateMachine.stateMachineArn

//       }

//     });
 
//     stateMachine.grantStartExecution(triggerStepLambda);
 
//     // // ✅ API Gateway integration

//     // const api = new apigateway.RestApi(this, 'TaqyeemProAPI', {

//     //   restApiName: 'TaqyeemPro Service',

//     // });
 
//     const Invoke = api.root.addResource("invokeFunction");

//     Invoke.addMethod("POST", new apigateway.LambdaIntegration(triggerStepLambda));



//     // ───────────────────────────────────────────────────────────────────────────────
//     // DynamoDB Tables for Exam Questions and Results
//     // Create a DynamoDB Table for storing exam questions
//     const examQuestionsTable = new dynamodb.Table(this, 'ExamQuestionsTable', {
//       tableName: 'ExamQuestions',
//       partitionKey: { name: 'subject_grade', type: dynamodb.AttributeType.STRING },
//       sortKey: { name: 'questionId', type: dynamodb.AttributeType.STRING }, // for grouping
//       removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
//     });

//     // Create a DynamoDB Table for storing exam results
//     const examResultsTable = new dynamodb.Table(this, 'ExamResultsTable', {
//       tableName: 'ExamResults',
//       partitionKey: { name: 'studentId_grade', type: dynamodb.AttributeType.STRING },
//       sortKey: { name: 'questionId_subject', type: dynamodb.AttributeType.STRING }, // for grouping
//       removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
//     });

//     // Add GSI to support querying by questionId_subject
//     examResultsTable.addGlobalSecondaryIndex({
//       indexName: 'QuestionIndex',
//       partitionKey: { name: 'questionId_subject', type: dynamodb.AttributeType.STRING },
//       sortKey: { name: 'studentId_grade', type: dynamodb.AttributeType.STRING },
//       projectionType: dynamodb.ProjectionType.ALL // include all attributes
//     });



//     // ───────────────────────────────────────────────────────────────────────────────  
//     // Cognito User Pools for SME and Student
//     const smeUserPool = new cognito.UserPool(this, 'SMEUserPool', {
//       userPoolName: 'SMEUserPool',
//       selfSignUpEnabled: true,
//       signInAliases: { email: true },
//       autoVerify: { email: true },
//       passwordPolicy: {
//         minLength: 8,
//         requireLowercase: true,
//         requireUppercase: true,
//         requireDigits: true,
//         requireSymbols: false
//       },
//       accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
//       standardAttributes: {
//         givenName: { required: true, mutable: true },     // First Name
//         familyName: { required: true, mutable: true },    // Last Name
//         gender: { required: true, mutable: true },
//         birthdate: { required: true, mutable: true },
//         email: { required: true, mutable: true },
//         phoneNumber: { required: true, mutable: true },
//       },
//     });

//     const smeUserPoolClient = new cognito.UserPoolClient(this, 'SMEUserPoolClient', {
//       userPool: smeUserPool,
//       generateSecret: false
//     });

//     const studentUserPool = new cognito.UserPool(this, 'StudentUserPool', {
//       userPoolName: 'StudentUserPool',
//       selfSignUpEnabled: true,
//       signInAliases: { email: true },
//       autoVerify: { email: true },
//       passwordPolicy: {
//         minLength: 6,
//         requireLowercase: true,
//         requireUppercase: false,
//         requireDigits: true,
//         requireSymbols: false
//       },
//       accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
//       standardAttributes: {
//         givenName: { required: true, mutable: true },     // First Name
//         familyName: { required: true, mutable: true },    // Last Name
//         gender: { required: true, mutable: true },
//         birthdate: { required: true, mutable: true },
//         email: { required: true, mutable: true },
//       },
//       customAttributes: {
//         grade: new cognito.NumberAttribute({ mutable: true }),
//         school: new cognito.StringAttribute({ mutable: true }),
//       }
//     });

//     const studentUserPoolClient = new cognito.UserPoolClient(this, 'StudentUserPoolClient', {
//       userPool: studentUserPool,
//       generateSecret: false
//     });

//     // Outputs
//     new CfnOutput(this, 'StudentUserPoolId', {
//       value: studentUserPool.userPoolId,
//     });

//     new CfnOutput(this, 'StudentUserPoolClientId', {
//       value: studentUserPoolClient.userPoolClientId,
//     });

//     new CfnOutput(this, 'SMEUserPoolId', {
//       value: smeUserPool.userPoolId,
//     });

//     new CfnOutput(this, 'SMEUserPoolClientId', {
//       value: smeUserPoolClient.userPoolClientId,
//     })
//   }
// }

// module.exports = { SingleStack };