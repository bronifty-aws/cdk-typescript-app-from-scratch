import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

interface ApiStackProps extends cdk.StackProps {
  helloLambdaIntegration: cdk.aws_apigateway.LambdaIntegration;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new cdk.aws_apigateway.RestApi(this, "SpacesApi", {});
    const spacesResource = api.root.addResource("spaces");
    spacesResource.addMethod("GET", props.helloLambdaIntegration);
  }
}
