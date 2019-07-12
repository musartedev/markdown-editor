const express = require("express");

const { PORT } = require("./utils/constants");

const app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(PORT, function() {
  console.log(`Maggic Happens on port ${PORT}!`);
});
