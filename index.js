const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const prompt = body.prompt || "Hello, how can I help you?";
  const region = process.env.REGION || "us-east-1";

  const bedrock = new AWS.BedrockRuntime({ region });

  const params = {
    modelId: process.env.BEDROCK_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 200,
      temperature: 0.5
    })
  };

  try {
    const response = await bedrock.invokeModel(params).promise();
    const responseBody = JSON.parse(Buffer.from(response.body).toString('utf-8'));

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error invoking Bedrock", error: err.message })
    };
  }
};
