import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postHandler } from "./postHandlerOriginal";
import DynamoDBService from "../shared/db";

const ddbClient = DynamoDBService.getInstance();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        message = "your mom";
        break;
      case "POST":
        const response = postHandler(event, ddbClient);
        return response;
      default:
        break;
    }
  } catch (error: Error | any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
