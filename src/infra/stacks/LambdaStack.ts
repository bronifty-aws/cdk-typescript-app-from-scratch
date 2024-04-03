import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new cdk.aws_lambda.Function(this, "LambdaFunction", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      handler: "hello.main",
      code: cdk.aws_lambda.Code.fromAsset(
        path.join(__dirname, "../../services")
      ),
    });
  }
}
