import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { JobTrackerServiceStage } from "./stages/job-tracker-service-stage";

export class JobTrackerPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'JobTrackerPipeline', {
      pipelineName: 'JobTrackerPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('prestogeorge/JobTracker', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-1:357200941310:connection/e8ed2ad3-5d54-4d8e-9209-a41c40537924'
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    pipeline.addStage(new JobTrackerServiceStage(this, 'JobTrackerServiceStage'));
  }
}
