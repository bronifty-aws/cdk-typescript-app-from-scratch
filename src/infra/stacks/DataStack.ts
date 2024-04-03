import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../utils";

export class DataStack extends cdk.Stack {
  public readonly spacesTable: cdk.aws_dynamodb.ITable;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stackSuffix = getSuffixFromStack(this);

    this.spacesTable = new cdk.aws_dynamodb.Table(this, "SpacesTable", {
      partitionKey: { name: "id", type: cdk.aws_dynamodb.AttributeType.STRING },
      tableName: `spaces-table-${stackSuffix}`,
    });
  }
}
