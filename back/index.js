const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT } = require("./utils/constants");
const { database } = require("./config");
const documentRoutes = require("./routes/document");

const app = express();
app.use(cors()); // Allow cross-origin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true }); // connect to database

// DB connected
mongoose.connection.on("connected", () =>
  console.log("Mongoose default connection open to " + database)
);

// DB connection error
mongoose.connection.on("error", err =>
  console.log("Mongoose default connection error: " + err)
);

// Close DB connection when app exits
process.on("SIGINT", () =>
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  })
);

// ROUTES
documentRoutes(app);

app.listen(PORT, function() {
  console.log(`Maggic Happens on port ${PORT}!`);
});
