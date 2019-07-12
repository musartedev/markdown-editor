const { ERRORS } = require("./constants");

exports.ok = (res, httpCode, response) => res.status(httpCode).json(response);

exports.error = (res, id) => {
  let error = ERRORS[id];
  id = error ? id : "INTERNAL_ERROR";
  error = error ? error : ERRORS[id];

  return res.status(error.httpCode).json({
    error: {
      id: id,
      description: error.description
    }
  });
};
