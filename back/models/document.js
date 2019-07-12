let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let DocumentSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    rawText: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

DocumentSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    throw "DUPLICATE_DOCUMENT_TITLE";
  } else {
    next();
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
