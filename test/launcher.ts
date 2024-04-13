import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "spaces-table-0e64312a57df";

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "fbe76aea-5aff-434e-85f6-e8f5fc1647ec",
    },
    body: JSON.stringify({
      location: "Best location 2",
    }),
  } as any,
  {} as any
).then((result) => {
  console.log(result);
});
