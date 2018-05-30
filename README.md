# viseo-ddp

Viseo DDP

## Test

- `npm test`

HTML reports in [coverage/lcov-report/index.html](coverage/lcov-report/index.html)

## Deployment
- `AWS_PROFILE=<AWS_PROFILE> npx sls deploy`
- `AWS_PROFILE=<AWS_PROFILE> npx sls info`
- `AWS_PROFILE=<AWS_PROFILE> npx sls remove`

## Development

Currently this application is using the default integration method lambda-proxy object with status code and message should be returned as in the example below:

Sample 404:
```
module.exports.hello = (event, context, callback) => {
  callback(null, { statusCode: 404, body: "Not found", headers: { "Content-Type": "text/plain" } });
}
```

Sample 403:
```callback(null, { statusCode: 403, body: "Forbidden", headers: { "Content-Type": "text/plain" } });```

Sample 404:
```callback(null, { statusCode: 400 });```

A good practice is to even catch all crashes in the code and convert them to a "success" result -> as statusCode: 500 and put the callstack or the stringified exception in the body of the response.

See also the [Serverless Docs](https://serverless.com/framework/docs/providers/aws/events/apigateway/#status-codes) regarding this.
