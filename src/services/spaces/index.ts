import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import DynamoDBService from "../shared/db";
import { postHandler } from "./postHandler";
import { scanHandler } from "./scanHandler";
// const ddb = DynamoDBService.getInstance({
//   region: process.env.AWS_REGION || "",
//   tableName: process.env.TABLE_NAME || "",
// });

// for testing
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});
// end of testing

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
        response = await scanHandler(event, ddb);
      // case "POST":
      //   return await postHandler(event, ddb);
      default:
        break;
    }
  } catch (error: Error | any) {
    response = {
      statusCode: 500,
      body: "error",
    };
  }
  return response;
}

export { handler };
