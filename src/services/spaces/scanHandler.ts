import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import DynamoDBService from "../shared/db";

export async function scanHandler(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );
  const unmashalledItems = result.Items?.map((item) => unmarshall(item));
  console.log(unmashalledItems);

  return {
    statusCode: 201,
    body: JSON.stringify(unmashalledItems),
  };
}
