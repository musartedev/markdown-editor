const { Router } = require("express");
const documentController = require("../controllers/document");

module.exports = app => {
  const documentRouter = Router();

  documentRouter.post("/", documentController.add);

  app.use("/documents", documentRouter);
};
