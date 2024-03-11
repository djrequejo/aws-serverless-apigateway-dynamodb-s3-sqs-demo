# Demo SAM API Gateway DynamoDB

This project demonstrates the usage of AWS Serverless Application Model (SAM) to create a RESTful API with AWS API Gateway and DynamoDB on AWS Lambda.

## Prerequisites

- Node.js v18.x
- Serverless Framework
- AWS CLI configured
- AWS account with permissions to create API Gateway, DynamoDB resources, and IAM roles.

## Installation

1. Clone this repository:
```bash
git clone https://github.com/djrequejo/aws-demo-sam-apigw-dynamodb.git
cd demo-sam-apigw-dynamodb
```

2. Install project dependencies:
```bash
npm install
```

## Configuration

Before deploying the service to AWS, make sure to configure the `serverless.yaml` file with appropriate values for your environment, including the DynamoDB table name and any other specific settings.

## Usage

### Deploying the Service

To deploy the service to your AWS account, run the following command:

```bash
serverless deploy
```

### Local Testing

You can test the service locally using the `serverless-offline` plugin. Run the following command to start the local server:

```bash
serverless offline start
```

## Endpoints

Once deployed, the service offers the following endpoints:

- `GET /users/{id}`: Get details of a specific user.
- `POST /users`: Create a new user.
- `PATCH /users/{id}`: Update details of an existing user.
- `DELETE /users/{id}`: Delete an existing user.

## Cleanup

To remove all the resources created on AWS, run the following command:

```bash
serverless remove
```
## GitHub Actions Integration

This project is integrated with GitHub Actions. A workflow named "Deploy DEV" is triggered on pull requests to the `main` branch. This workflow builds and tests the changes and then deploys the Lambda function using Serverless Framework. The deployment status is then commented on the pull request.

## Contribution

Contributions are welcome! If you find any issues or have any enhancements, please open an issue or send a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

