import * as cdk from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";

const app = new cdk.App();
const dataStack = new DataStack(app, "DataStack");
