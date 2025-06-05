const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const examId = body.examId;

    if (!examId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing examId in request body" }),
      };
    }

    await dynamoDb.delete({
      TableName: 'Exams',
      Key: { examId }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Exam deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting exam", error: error.message }),
    };
  }
};
