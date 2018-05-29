const parseRequest = require("./stage-100-accept");

describe("Stage 100 Accept", () => {
  it("should return 200", done => {
    parseRequest("payload data...", (err, res) => {
      expect(res).toEqual(200);
      done();
    });
  });
});
