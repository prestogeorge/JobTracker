import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { aws_apigateway as apigateway } from "aws-cdk-lib";

export class JobTrackerServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const postJobLambda = new Function(this, 'PostJobLambda', {
            runtime: Runtime.PYTHON_3_9,
            handler: 'post.handler',
            code: Code.fromAsset(path.join(__dirname, '../../service/src/jobs'))
        });

        const api = new apigateway.RestApi(this, 'JobTrackerAPI');
        const jobs = api.root.addResource('jobs');
        jobs.addMethod('POST', new apigateway.LambdaIntegration(postJobLambda));
    }
}