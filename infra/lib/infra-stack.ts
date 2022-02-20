import * as S3 from "@aws-cdk/aws-s3";
import * as S3Deployment from "@aws-cdk/aws-s3-deployment";
import { Construct, Stack, StackProps, CfnOutput } from '@aws-cdk/core';

const path = "../build/txm-presentations.zip";

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new S3.Bucket(this, "Files", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    new S3Deployment.BucketDeployment(this, "Deployment", {
      sources: [
        S3Deployment.Source.asset("../css"),
      ],
      destinationBucket: bucket,
      memoryLimit: 512
    });

    new CfnOutput(this, "BucketDomain", {
      value: bucket.bucketWebsiteDomainName,
    });
  }
}
