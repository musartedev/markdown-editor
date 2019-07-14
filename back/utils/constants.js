const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") dotenv.config();

exports.PORT = process.env.PORT || 3001;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_USER = process.env.DB_USER;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_NAME = process.env.DB_NAME;

exports.ERRORS = {
  INTERNAL_ERROR: {
    httpCode: 500,
    description: "An error has ocurred! Try later."
  },
  MISSING_REQUIRED_FIELDS: {
    httpCode: 400,
    description: "Missing required fields"
  },
  NOT_FOUND: {
    httpCode: 404,
    description: "Document not found"
  },
  DUPLICATE_DOCUMENT_TITLE: {
    httpCode: 403,
    description: "Sorry! That title is taken. Please try another."
  },
  INVALID_FIELD: {
    httpCode: 400,
    description: "One of the fields is invalid. Please check and try again."
  }
};
