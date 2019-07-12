const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = require("./utils/constants");

exports.database = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
