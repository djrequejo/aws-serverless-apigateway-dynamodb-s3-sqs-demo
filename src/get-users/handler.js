
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

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
const TABLE_NAME = process.env.TABLE_NAME;

const getUsers = async (event, context) => {
    let { id } = event.pathParameters;

    console.log(`Query param: ${id}`);

    const command = new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: { ":pk": id }
    });

    const response = await docClient.send(command);
    console.log(response);
    return {
        "statusCode": 200,
        "body": JSON.stringify({
            'user': response.Items
        })
    };
};

module.exports = {
    getUsers
}