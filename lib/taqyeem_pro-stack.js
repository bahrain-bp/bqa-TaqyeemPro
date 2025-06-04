// Import necessary AWS CDK libraries
const { Stack, CfnOutput, RemovalPolicy, Duration } = require("aws-cdk-lib");
const cloudfront_origins = require("aws-cdk-lib/aws-cloudfront-origins");
const s3 = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const cdk = require("aws-cdk-lib");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");

class TaqyeemProStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // ───────────────────────────────────────────────────────────────────────────────
    // Basic HelloWorld Lambda Function and Function URL Output
    // ───────────────────────────────────────────────────────────────────────────────
    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
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

    new CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    });

    // ───────────────────────────────────────────────────────────────────────────────
    // Lambda Functions for Exam Management
    // ───────────────────────────────────────────────────────────────────────────────

    // Lambda for generating exams and writing to DynamoDB
    const examGenerationLambda = new lambda.Function(
      this,
      "ExamGenerationFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: "ExamGeneration.handler",
        code: lambda.Code.fromAsset("lambda"),
        environment: {
          TABLE_NAME: "ExamQuestions",
        },
      }
    );

    // Lambda for viewing questions from DynamoDB
    const viewQuestionsLambda = new lambda.Function(
      this,
      "ViewQuestionsFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: "ViewQuestions.handler",
        code: lambda.Code.fromAsset("lambda"),
        environment: {
          TABLE_NAME: "ExamQuestions",
        },
      }
    );

    // Lambda function to create exams
    const createExamLambda = new lambda.Function(
      this, 
      'CreateExamFunction', {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'CreateExam.lambda_handler', 
      timeout: Duration.seconds(60),
      environment: {
        TABLE_NAME: 'GeneratedExams'
      }
    });

    // Grant write access to ExamGeneration Lambda
    const examQuestionsTable = dynamodb.Table.fromTableName(
      this,
      "ImportedExamQuestionsTable",
      "ExamQuestions"
    );
    examQuestionsTable.grantWriteData(examGenerationLambda);

    // Grant read access to ViewQuestions Lambda
    const viewQuestionsTable = dynamodb.Table.fromTableName(
      this,
      "ImportedExamQuestionsTable_Read",
      "ExamQuestions"
    );
    viewQuestionsTable.grantReadData(viewQuestionsLambda);

    // ───────────────────────────────────────────────────────────────────────────────
    // Lambda Functions for Result Table
    // ───────────────────────────────────────────────────────────────────────────────

    // Lambda function for inserting student result
    const saveResultsLambda = new lambda.Function(this, 'SaveExamResultFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'saveResults.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: "ExamResults"
      }
    });

    // Grant write access to insertResultsFunction Lambda
    const saveResultsTable = dynamodb.Table.fromTableName(
      this,
      "ImportedExamResultsTable",
      "ExamResults"
    );
    saveResultsTable.grantWriteData(saveResultsLambda);

    // ───────────────────────────────────────────────────────────────────────────────
    // Lambda Functions for GeneratedExams Table
    // ───────────────────────────────────────────────────────────────────────────────

    // Import existing DynamoDB tables
    const examsTable = dynamodb.Table.fromTableName(this, 'ExamsTable', 'GeneratedExams');
    const questionsTable = dynamodb.Table.fromTableName(this, 'QuestionsTable', 'ExamQuestions');

    // Lambda function
    const getExamsLambda = new lambda.Function(this, 'GetExamsWithQuestionsLambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'viewGeneratedExams.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        EXAMS_TABLE_NAME: examsTable.tableName,
        QUESTIONS_TABLE_NAME: questionsTable.tableName,
      },
    });

    // Grant read access to both tables
    examsTable.grantReadData(getExamsLambda);
    questionsTable.grantReadData(getExamsLambda);

    // Give createExam write access to the GeneratedExams table
    const examTable = dynamodb.Table.fromTableName(
      this, 
      'ImportedGeneratedExamsTable', 
      'GeneratedExams'
    );
    examTable.grantWriteData(createExamLambda);
    
    // ───────────────────────────────────────────────────────────────────────────────
    // S3 Bucket and CloudFront Distribution (General Use)
    // ───────────────────────────────────────────────────────────────────────────────

    const bucket = new s3.Bucket(this, "TaqyeemProBucket", {
      versioned: true,
      publicReadAccess: false,
    });

    new cloudfront.Distribution(this, "TaqyeemProDistribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
      },
    });

    // ───────────────────────────────────────────────────────────────────────────────
    // Static Web Hosting Setup (S3 + CloudFront + Deployment)
    // ───────────────────────────────────────────────────────────────────────────────

    // S3 Bucket for static website content
    const s3StaticWebContent = new s3.Bucket(this, "TaqyeemPro-Web-Bucket", {
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Create Origin Access Identity for secure CloudFront access to S3
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "TaqyeemProOAI"
    );
    s3StaticWebContent.grantRead(originAccessIdentity);

    // CloudFront Distribution for static website
    const staticSiteCDN = new cloudfront.Distribution(
      this,
      "TaqyeemProStaticWebCDN",
      {
        defaultBehavior: {
          origin: new cloudfront_origins.S3Origin(s3StaticWebContent, {
            originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: Duration.seconds(0),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: Duration.seconds(0),
          },
        ],
      }
    );

    new CfnOutput(this, "StaticSiteURL", {
      value: `https://${staticSiteCDN.domainName}`,
      description: "The CloudFront URL for the static website",
    });

    // Deploy frontend files and force refresh with timestamp
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [
        s3deploy.Source.asset("./frontend/taqyeempro/dist"),
        s3deploy.Source.data("timestamp.txt", new Date().toISOString()),
      ],
      destinationBucket: s3StaticWebContent,
      distribution: staticSiteCDN,
      distributionPaths: ["/*"],
    });

    // ───────────────────────────────────────────────────────────────────────────────
    // Curriculum Docs Bucket + Upload Lambda
    // ───────────────────────────────────────────────────────────────────────────────

    // S3 Bucket for curriculum and test specifications
    const curriculumDocsBucket = new s3.Bucket(this, "CurriculumDocsBucket", {
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Lambda for generating presigned S3 upload URLs
    const getUploadUrlLambda = new lambda.Function(
      this,
      "GetUploadUrlFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: "GetUploadUrl.lambda_handler",
        code: lambda.Code.fromAsset("lambda"),
        environment: {
          BUCKET_NAME: curriculumDocsBucket.bucketName,
        },
      }
    );

    curriculumDocsBucket.grantPut(getUploadUrlLambda);

    const listFilesLambda = new lambda.Function(this, "ListS3FilesFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "ListS3Files.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        BUCKET_NAME: curriculumDocsBucket.bucketName,
      },
    });
    curriculumDocsBucket.grantRead(listFilesLambda);

    // ───────────────────────────────────────────────────────────────────────────────
    // DynamoDB Table
    // ───────────────────────────────────────────────────────────────────────────────
    // new dynamodb.Table(this, "TaqyeemProTable", {
    //   partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    // });

    // ───────────────────────────────────────────────────────────────────────────────
    // API Gateway Setup
    // ───────────────────────────────────────────────────────────────────────────────

    const api = new apigateway.RestApi(this, "TaqyeemProAPI", {
      restApiName: "TaqyeemPro Service",
    });

    // Route: POST /get-upload-url → GetUploadUrl Lambda
    const uploadUrlResource = api.root.addResource("get-upload-url");
    uploadUrlResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(getUploadUrlLambda)
    );

    const listFilesResource = api.root.addResource("list-files");
    listFilesResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(listFilesLambda)
    );

    // Route: GET /items → Mock data for testing
    const items = api.root.addResource("items");
    items.addMethod(
      "GET",
      new apigateway.MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": '[{"id": "1", "name": "example"}]',
            },
          },
        ],
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    const updateQuestionLambda = new lambda.Function(
      this,
      "UpdateQuestionFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_9,
        handler: "UpdateQuestion.handler",
        code: lambda.Code.fromAsset("lambda"),
        environment: {
          TABLE_NAME: "ExamQuestions",
        },
      }
    );
    examQuestionsTable.grantWriteData(updateQuestionLambda);

    const updateQuestionResource = api.root.addResource("update-question");
    updateQuestionResource.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(updateQuestionLambda)
    );

    // Route: POST /add-question → ExamGeneration Lambda
    const addQuestionResource = api.root.addResource("add-question");
    addQuestionResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(examGenerationLambda)
    );

    const viewExamsLambda = new lambda.Function(this, "ViewExamsFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "ViewExams.handler", // Points to ViewExams.py
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TABLE_NAME: "ExamQuestions",
      },
    });

    examQuestionsTable.grantReadData(viewExamsLambda);

    const viewExamsResource = api.root.addResource("view-exams");
    viewExamsResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(viewExamsLambda)
    );

    // Route: GET /view-question → ViewQuestions Lambda
    const viewQuestionResource = api.root.addResource("view-question");
    viewQuestionResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(viewQuestionsLambda)
    );

    // Route: POST /save-results → saveResults Lambda
    const saveResults = api.root.addResource('save-results');
    saveResults.addMethod('POST', new apigateway.LambdaIntegration(saveResultsLambda));

    // Route: GET /view-exams 
    const examsResource = api.root.addResource('view-exams');
    examsResource.addMethod('GET', new apigateway.LambdaIntegration(getExamsLambda));

  // Create exams api 
    const createExam = api.root.addResource('create-exam');
    createExam.addMethod("POST", 
      new apigateway.LambdaIntegration(createExamLambda));

  }
}

module.exports = { TaqyeemProStack };
