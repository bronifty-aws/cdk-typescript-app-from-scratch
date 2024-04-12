// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import DynamoDBService from "../shared/db";

export async function scanHandler(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBService
): Promise<APIGatewayProxyResult> {
  const result = await ddbClient.scanTable();
  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
}
