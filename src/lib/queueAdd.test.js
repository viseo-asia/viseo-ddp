const queueAdd = require("./queueAdd");

describe("queueAdd", () => {
  const params = {
    MessageBody: "Test Message Body",
    QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/xxxxxx/test"
  };

  it("should add to queue", done => {
    const sqsMock = {
      sendMessage: function(params, callback) {
        callback(null, { MessageId: 501 });
      }
    };

    queueAdd(sqsMock, params, (err, res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.messageId).toEqual(501);
      done();
    });
  });

  it("should handle add to queue errors", done => {
    const sqsMock = {
      sendMessage: function(params, callback) {
        return callback({
          message:
            "Access to the resource https://sqs.ap-southeast-1.amazonaws.com/ is denied.",
          code: "AccessDenied",
          time: "2018-05-30T07:19:31.673Z",
          requestId: "4584c7d9-ce1d-5d03-b324-94519cde1a5d",
          statusCode: 403,
          retryable: false,
          retryDelay: 52.38478737023644
        });
      }
    };

    queueAdd(sqsMock, params, (err, res) => {
      expect(res.statusCode).toEqual(403);
      done();
    });
  });
});
