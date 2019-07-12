const { ERRORS } = require("./constants");

exports.ok = (res, httpCode, response) => res.status(httpCode).json(response);

exports.error = (res, id) => {
  let error = ERRORS[id];
  error = error ? error : ERRORS["INTERNAL_ERROR"];

  return res.status(error.httpCode).json({
    error: {
      id: id,
      description: error.description
    }
  });
};
