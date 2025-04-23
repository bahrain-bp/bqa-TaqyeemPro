const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const { Stack, Construct } = cdk;

class DynamodbStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a DynamoDB Table for storing exam questions
    const examQuestionsTable = new dynamodb.Table(this, 'ExamQuestionsTable', {
      tableName: 'ExamQuestions',
      partitionKey: { name: 'questionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'subject_grade', type: dynamodb.AttributeType.STRING }, // for grouping
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
    });

    // Create a DynamoDB Table for storing exam results
    const examResultsTable = new dynamodb.Table(this, 'ExamResultsTable', {
      tableName: 'ExamResults',
      partitionKey: { name: 'questionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'studentId', type: dynamodb.AttributeType.STRING }, // for grouping
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
    });

  }
}

module.exports = { DynamodbStack };
