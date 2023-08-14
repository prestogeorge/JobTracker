#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { JobTrackerPipelineStack } from '../lib/job-tracker-pipeline-stack';

const app = new cdk.App();
new JobTrackerPipelineStack(app, 'JobTrackerStack', {
  env: {
    account: '357200941310',
    region: 'us-west-1',
  }
});

app.synth();