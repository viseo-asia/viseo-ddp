"use strict";

const QUEUE_URL = "https://sqs.ap-southeast-1.amazonaws.com/526492987552/demo1";
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ region: "ap-southeast-1" });

const queueAdd = require("../lib/queueAdd");

module.exports.workout = (event, context, callback) => {
  var params = {
    MessageBody: event.body,
    QueueUrl: QUEUE_URL
  };

  return queueAdd(sqs, params, (err, res) => {
    // err and res will be an object with a statusCode and body
    // ex: {statusCode: 500} ex: {statusCode: 200}
    if (err) {
      return callback(null, err);
    }

    return callback(null, res);
  });
};
