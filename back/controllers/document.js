const Document = require("../models/document");
const ObjectId = require("mongoose").Types.ObjectId;
const sendResponse = require("../utils/sendResponse");

exports.add = async (req, res) => {
  const { title } = req.body;

  if (!title) return sendResponse.error(res, "MISSING_REQUIRED_FIELDS");
  try {
    const newDocument = new Document({ title });
    await newDocument.save();

    return sendResponse.ok(res, 201, {
      message: "Documment added successfully!"
    });
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

    return sendResponse.ok(res, 200, { message: "Document saved!" });
  } catch (err) {
    console.log(err);
    return sendResponse.error(res, err);
  }
};

exports.delete = async (req, res) => {
  const { _id } = req.params;

  if (!_id) return sendResponse.error(res, "MISSING_REQUIRED_FIELDS");

  if (!ObjectId.isValid(_id)) return sendResponse.error(res, "INVALID_FIELD");

  try {
    await Document.deleteOne({ _id });

    return sendResponse.ok(res, 200, { message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    return sendResponse.error(res, err);
  }
};

exports.list = list = async (req, res) => {
  const { sort = "created_at" } = req.query;
  try {
    const documents = await Document.find().sort({ [`${sort}`]: -1 });
    return sendResponse.ok(res, 200, { documents });
  } catch (err) {
    console.log(err);
    return sendResponse.error(res, err);
  }
};

exports.get = async (req, res) => {
  const { _id } = req.params;

  if (!_id) return list(req, res);

  if (!ObjectId.isValid(_id)) return sendResponse.error(res, "INVALID_FIELD");

  try {
    const document = await Document.find({ _id });
    return sendResponse.ok(res, 200, { document });
  } catch (err) {
    console.log(err);
    return sendResponse.error(res, err);
  }
};
