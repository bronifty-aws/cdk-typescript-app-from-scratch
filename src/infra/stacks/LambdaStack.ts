import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambdaFunction = new cdk.aws_lambda.Function(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        handler: "hello.main",
        code: cdk.aws_lambda.Code.fromAsset(
          path.join(__dirname, "../../services")
        ),
      }
    );
    this.helloLambdaIntegration = new cdk.aws_apigateway.LambdaIntegration(
      helloLambdaFunction
    );
  }
}
