const queueAdd = require("./queueAdd");

describe("queueAdd", () => {
  const params = {
    MessageBody: '{ "message": "Message in a bottle" }',
    QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/xxxxxx/test"
  };

  it("should add to queue", done => {
    const sqsMock = {
      sendMessage: function(params, callback) {
        callback(null, { MessageId: 501 });
      }
    };

    queueAdd(sqsMock, params, (err, res) => {
      console.log(101, res)
      expect(res.statusCode).toEqual(200);
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

  it('should validate reject invalid input', done => {
   queueAdd({}, {}, (err, res) => {
    expect(res.statusCode).toEqual(400)
    expect(JSON.parse(res.body).message).toMatch(/bad request/i)
    done();
   }) 
  })
});
