const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { UpdateCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

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

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const likeuser = async (event, context) => {
    const body = event.Records[0].body;
    const userid = JSON.parse(body).id;
    console.log(userid);

    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk: userid },
        UpdateExpression: "ADD likes :increment",
        ExpressionAttributeValues: {
            ":increment": 1
        },
        ReturnValues: "ALL_NEW"
    });

    const response = await docClient.send(command);
    await sleep(4000);
    console.log(response);
}
module.exports = { likeuser }