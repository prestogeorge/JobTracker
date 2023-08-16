import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { aws_apigateway } from "aws-cdk-lib";

export class JobTrackerServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const jobTrackerLambda = new Function(this, 'JobTrackerLambda', {
            runtime: Runtime.PYTHON_3_9,
            handler: 'index.handler',
            code: Code.fromAsset(path.join(__dirname, '../../service/src/'))
        });

        const api = new aws_apigateway.LambdaRestApi(this, 'JobTrackerAPI', {
            handler: jobTrackerLambda
        });

    }
}