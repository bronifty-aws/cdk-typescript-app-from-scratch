import * as cdk from "aws-cdk-lib";

export function getSuffixFromStack(stack: cdk.Stack): string {
  const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", stack.stackId));
  const suffix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  return suffix;
}
