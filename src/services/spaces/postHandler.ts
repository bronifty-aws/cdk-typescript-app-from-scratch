// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import DynamoDBService from "../shared/db";

export async function postHandler(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBService
): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body as string);

  const props = {
    id: randomId,
    location: item.location,
  };

  const result = ddbClient.putItem(props);
  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };
}
