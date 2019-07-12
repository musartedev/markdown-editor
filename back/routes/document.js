const { Router } = require("express");
const documentController = require("../controllers/document");

module.exports = app => {
  const documentRouter = Router();

  documentRouter.post("/", documentController.add);
  documentRouter.put("/:_id", documentController.edit);
  documentRouter.delete("/:_id", documentController.delete);

  app.use("/documents", documentRouter);
};
