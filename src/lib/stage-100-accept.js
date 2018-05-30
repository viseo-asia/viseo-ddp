const parseRequest = (payload, cb) => {
  console.log(payload);
  cb(null, 200);
};

module.exports = parseRequest;
