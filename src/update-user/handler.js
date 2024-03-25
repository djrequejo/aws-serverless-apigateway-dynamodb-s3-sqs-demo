
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

const updateUser = async (event, context) => {
    let { id } = event.pathParameters;
    let userBody = JSON.parse(event.body);

    console.log(`Body: ${userBody}`);

    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
            pk: id
        },
        UpdateExpression: "set #name = :name, #phonenumber = :phonenumber",
        ExpressionAttributeNames: {
            "#name": "name",
            "#phonenumber": "phonenumber"
        },
        ExpressionAttributeValues: {
            ":name": userBody.name,
            ":phonenumber": userBody.phonenumber
        },
        ReturnValues: "ALL_NEW"
    });

    const response = await docClient.send(command);
    return {
        "statusCode": 200,
        "body": JSON.stringify({
            'user': response.Attributes
        })
    };
};

module.exports = {
    updateUser
}