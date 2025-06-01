const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const { Stack, Construct } = cdk;

class DynamodbStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a DynamoDB Table for storing exam questions
    const examQuestionsTable = new dynamodb.Table(this, 'ExamQuestionsTable', {
      tableName: 'ExamQuestions',
      partitionKey: { name: 'subject_grade', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'questionId', type: dynamodb.AttributeType.STRING }, // for grouping
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      //removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
    });

    // Create a DynamoDB Table for storing exam results
    const examResultsTable = new dynamodb.Table(this, 'ExamResultsTable', {
      tableName: 'ExamResults',
      partitionKey: { name: 'studentId_grade', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'questionId_subject', type: dynamodb.AttributeType.STRING }, // for grouping
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      //removalPolicy: cdk.RemovalPolicy.DESTROY,  // This will remove the table when the stack is deleted (for development purposes)
    });

    // Add GSI to support querying by questionId_subject
    examResultsTable.addGlobalSecondaryIndex({
      indexName: 'QuestionIndex',
      partitionKey: { name: 'questionId_subject', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'studentId_grade', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL // include all attributes
    });

    // store generated exams by moderator
    const generatedExamsTable = new dynamodb.Table(this, 'GeneratedExamsTable', {
      tableName: 'GeneratedExams',
      partitionKey: { name: 'examId', type: dynamodb.AttributeType.STRING }, // Unique exam ID
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Optional: remove in dev
    });

  }
}

module.exports = { DynamodbStack };
