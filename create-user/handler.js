
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

let dynamoDBClientParams = {};

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        credentials: {
            accessKeyId: 'MockAccessKeyId',  // needed if you don't have aws credentials at all in env
            secretAccessKey: 'MockSecretAccessKey' // needed if you don't have aws credentials at all in env
        }
    }
}

const client = new DynamoDBClient(dynamoDBClientParams);
const docClient = DynamoDBDocumentClient.from(client);

const createUser = async (event, context) => {
    const id = randomUUID();

    let userBody = JSON.parse(event.body);
    userBody.pk = id;

    console.log(`Body: ${userBody}`);

    const command = new PutCommand({
        TableName: "demo-sam-apigw-dynamodb-table",
        Item: userBody
    });

    const response = await docClient.send(command);
    return {
        "statusCode": 200,
        "body": JSON.stringify({
            'user': userBody
        })
    };
};

module.exports = {
    createUser
}