import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

interface LambdaStackProps extends cdk.StackProps {
  spacesTable: cdk.aws_dynamodb.ITable;
}

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const helloLambdaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/index.ts"),
        environment: {
          TABLE_NAME: props.spacesTable.tableName,
        },
      }
    );

    helloLambdaFunction.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ["s3:ListAllMyBuckets", "s3:ListBucket"],
        resources: ["*"], // bad practice
      })
    );

    this.helloLambdaIntegration = new cdk.aws_apigateway.LambdaIntegration(
      helloLambdaFunction
    );
  }
}
