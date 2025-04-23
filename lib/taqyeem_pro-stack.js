const { Stack, CfnOutput, RemovalPolicy, Duration } = require('aws-cdk-lib');
const cloudfront_origins = require('aws-cdk-lib/aws-cloudfront-origins');
const s3 = require('aws-cdk-lib/aws-s3');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const lambda = require('aws-cdk-lib/aws-lambda');
const origins = require('aws-cdk-lib/aws-cloudfront-origins');
const s3deploy = require('aws-cdk-lib/aws-s3-deployment');


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
    
    //S3 static web content
    const s3StaticWebContent = new s3.Bucket(this, 'TaqyeemProStaticWebContentBucket', {
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, 
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN,   //prevent deletion
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'TaqyeemProOAI');  

    s3StaticWebContent.grantRead(originAccessIdentity);
    //CloudFront Distribution for static web content bucket
    const staticSiteCDN = new cloudfront.Distribution(this, 'TaqyeemProStaticWebCDN', {
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(s3StaticWebContent, {
          originAccessIdentity: originAccessIdentity
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl:Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl:Duration.seconds(0),
        },
      ],

    });

    


  //Output the url of the static site in terminal
    new CfnOutput(this, 'StaticSiteURL', {
      value: `https://${staticSiteCDN.domainName}`,
      description: 'The CloudFront URL for the static website',
      });

    // Automatically upload the local static site files 
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [
        s3deploy.Source.asset('./frontend/build'),//change path if web content are located elswere in the future
        s3deploy.Source.data('timestamp.txt', new Date().toISOString())  //forces CDK to treat every deployment as a change by adding a fresh timestamp.txt file each time.
      ],
      destinationBucket: s3StaticWebContent,
      distribution: staticSiteCDN,
      distributionPaths: ['/*'],  // invalidates cache to not show old files   
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
  }
}

module.exports = { TaqyeemProStack };