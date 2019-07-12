const Document = require("../models/document");
const sendResponse = require("../utils/sendResponse");

exports.add = async (req, res) => {
  const { title } = req.body;

  if (!title) return sendResponse.error(res, "MISSING_REQUIRED_FIELDS");
  try {
    const newDocument = new Document({ title });
    await newDocument.save();

    return sendResponse.ok(res, 201, newDocument);
  } catch (err) {
    return sendResponse.error(res, err);
  }
};
