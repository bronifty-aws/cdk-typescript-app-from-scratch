import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

interface LambdaStackProps extends cdk.StackProps {
  spacesTable: cdk.aws_dynamodb.ITable;
}

export class LambdaStack extends cdk.Stack {
  public readonly spacesLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const spacesLambdaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "LambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
        handler: "handler",
        entry: path.join(__dirname, "../../services/spaces/index.ts"),
        environment: {
          TABLE_NAME: props.spacesTable.tableName,
        },
      }
    );

    spacesLambdaFunction.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ["s3:ListAllMyBuckets", "s3:ListBucket"],
        resources: ["*"], // bad practice
      })
    );

    spacesLambdaFunction.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        resources: [props.spacesTable.tableArn],
        actions: ["dynamodb:PutItem"],
      })
    );

    this.spacesLambdaIntegration = new cdk.aws_apigateway.LambdaIntegration(
      spacesLambdaFunction
    );
  }
}
