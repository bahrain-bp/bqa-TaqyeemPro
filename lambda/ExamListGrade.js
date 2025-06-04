const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const grade = event.queryStringParameters?.grade; // e.g. "9"
  const studentId = event.queryStringParameters?.studentId;

  const params = {
    TableName: "ExamsTable",
    FilterExpression: "#grade = :gradeVal AND attribute_exists(students.#sid)",
    ExpressionAttributeNames: {
      "#grade": "grade",
      "#sid": studentId,
    },
    ExpressionAttributeValues: {
      ":gradeVal": grade,
    },
  };

  try {
    const data = await dynamo.scan(params).promise();

    // Extract only the student's view
    const exams = data.Items.map(item => ({
      examId: item.examId,
      title: item.title,
      date: item.date,
      status: item.students[studentId].status,
      score: item.students[studentId].score
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(exams),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch exams" }),
    };
  }
};
