import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import DynamoDBService from "../shared/db";
import { postHandler } from "./postHandler";
import { scanHandler } from "./scanHandler";
const ddb = DynamoDBService.getInstance({
  region: process.env.AWS_REGION || "",
  tableName: process.env.TABLE_NAME || "",
});

// for testing
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { postHandler } from "./postHandlerOriginal";
// const ddbClient = new DynamoDBClient({});
// end of testing

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        return await scanHandler(event, ddb);
      case "POST":
        return await postHandler(event, ddb);
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
