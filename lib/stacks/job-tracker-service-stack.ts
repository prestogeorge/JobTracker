import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class JobTrackerServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new Function(this, 'LambdaFunction', {
            runtime: Runtime.PYTHON_3_9,
            handler: 'lambda_handler.handler',
            code: Code.fromAsset(path.join(__dirname, 'service/src/lambda-handler'))
        });
    }
}