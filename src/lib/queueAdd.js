module.exports = (sqs, params, callback) => {
  console.log("runtime queueAdd exec params:", params);

  if (typeof params.MessageBody !== "string") {
    console.error("runtime Validation Failed");
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: "Bad Request, validation failed" })
    });
  }

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("runtime queueAdd error:", "Fail Send Message:" + err);
      return callback(null, {
        statusCode: err.statusCode,
        body: JSON.stringify(err)
      });
    }

    console.log("runtime queueAdd success, MessageId:", data.MessageId);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  });
};
