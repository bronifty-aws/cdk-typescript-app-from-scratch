import * as cdk from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";

const app = new cdk.App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack");
