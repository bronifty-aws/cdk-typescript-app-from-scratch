exports.handler = async function (event, context) {
  console.log("event: ", event);
  console.log("context: ", context);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello from the Space Finder API! I will read from ${process.env.TABLE_NAME}`,
    }),
  };
};
