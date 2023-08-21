import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { aws_apigateway as apigateway, aws_dynamodb as dynamodb, aws_iam as iam } from "aws-cdk-lib";
import { ManagedPolicy } from "aws-cdk-lib/aws-iam";

export class JobTrackerServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const lambdaRole = new iam.Role(this, 'LambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        });
        lambdaRole.addManagedPolicy(
            ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
        );

        const postJobLambda = new Function(this, 'PostJobLambda', {
            runtime: Runtime.PYTHON_3_9,
            handler: 'post.handler',
            code: Code.fromAsset(path.join(__dirname, '../../service/src/api/jobs'),
                {
                    bundling: {
                      image: Runtime.PYTHON_3_9.bundlingImage,
                      command: [
                        'bash', '-c',
                        'pip install -r requirements.txt -t /asset-output && cp -au . /asset-output'
                      ],
                }}),
            role: lambdaRole
        });

        const table = new dynamodb.Table(this, 'JobTrackerTable', {
            partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING}
        });
        table.grantFullAccess(lambdaRole);

        const api = new apigateway.RestApi(this, 'JobTrackerAPI');
        const jobs = api.root.addResource('jobs');
        jobs.addMethod('POST', new apigateway.LambdaIntegration(postJobLambda));
    }
}