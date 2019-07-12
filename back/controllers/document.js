const Document = require("../models/document");
const ObjectId = require("mongoose").Types.ObjectId;
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

exports.edit = async (req, res) => {
  const { _id } = req.params;
  const { rawText = "" } = req.body;

  if (!_id) return sendResponse.error(res, "MISSING_REQUIRED_FIELDS");

  if (!ObjectId.isValid(_id)) return sendResponse.error(res, "INVALID_FIELD");

  try {
    const docUpdated = await Document.findByIdAndUpdate(
      { _id },
      { $set: { rawText } },
      { new: true, useFindAndModify: false }
    );

    return sendResponse.ok(res, 200, docUpdated);
  } catch (err) {
    console.log(err);

    return sendResponse.error(res, err);
  }
};
