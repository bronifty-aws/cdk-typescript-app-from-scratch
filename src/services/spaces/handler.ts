import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

import { getSpaces } from "./GetSpaces";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let response: APIGatewayProxyResult = {
    statusCode: 400,
    body: "Unsupported method",
  };

  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces(event, ddbClient);

        break;
      default:
        break;
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: "error",
    };
  }
  return response;
}

export { handler };
