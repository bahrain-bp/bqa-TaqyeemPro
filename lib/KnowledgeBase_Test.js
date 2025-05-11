const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const s3 = require('aws-cdk-lib/aws-s3');
const iam = require('aws-cdk-lib/aws-iam');
const s3n = require('aws-cdk-lib/aws-s3-notifications');

class TaqyeemProKnowledgeTestStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    //S3 bucket that stores curriculum documents (already deployed)
    const bucketName = 'taqyeemprostack-curriculumdocsbucketb1075275-dfuvkyudisit';

    //IDs of Bedrock Knowledge Base and its Data Source
    const knowledgeBaseId = 'OZO0ZQ1PXP';
    const dataSourceId = 'AHJCHXYQBK';

    //Lambda function that will be triggered whenever a new file is uploaded to the S3 bucket
    const syncLambda = new lambda.Function(this, 'BedrockKnowledgeBaseSyncLambda', {
      code: lambda.Code.fromAsset('lambda'), 
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'lambda_trigger_kb_ingestion.lambda_handler', 
      timeout: Duration.seconds(300),
      environment: {
        KNOWLEDGE_BASE_ID: knowledgeBaseId, // pass KB ID to Lambda
        DATA_SOURCE_ID: dataSourceId,       // pass DS ID to Lambda
      },
    });

    //Grant Bedrock permissions to this Lambda
    syncLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'bedrock-agent:StartIngestionJob', // trigger ingestion
        'bedrock-agent:GetIngestionJob'    // optional: check status later
      ],
      resources: ['*'], 
    }));

    //Reference the existing bucket by name (no need to redeclare it)
    const curriculumBucket = s3.Bucket.fromBucketName(this, 'CurriculumBucketRef', bucketName);

    //Trigger the Lambda when a new object is uploaded to the bucket
    curriculumBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(syncLambda)
    );
  }
}

module.exports = { TaqyeemProKnowledgeTestStack };
