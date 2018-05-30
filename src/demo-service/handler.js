'use strict';

const sum = require('../lib/sum')

module.exports.hello = (event, context, callback) => {
  console.log('sum', sum(4,4))
  console.log('sum 101')
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
