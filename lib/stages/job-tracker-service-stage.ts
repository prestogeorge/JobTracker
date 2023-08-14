import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { JobTrackerServiceStack } from "../stacks/job-tracker-service-stack";

export class JobTrackerServiceStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      const lambdaStack = new JobTrackerServiceStack(this, 'ServiceStack');
    }
}