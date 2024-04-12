import { handler } from "../src/services/spaces";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "spaces-table-0e64312a57df";

// handler(
//   {
//     httpMethod: "POST",
//     body: JSON.stringify({
//       location: "xyz",
//     }),
//   } as any,
//   {} as any
// );


(async () => {
  try {
    const scanResult = await handler(
      {
        httpMethod: "GET",
      } as any,
      {} as any
    );
    console.log(await scanResult);
  } catch (error) {
    console.error(error);
  }
})();