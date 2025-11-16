const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  userId: {
    _id: {
      type: String,
      require: true,
    },
    type: Object,
    require: true,
  },
  attachment: {
    fieldname: {
      type: String,
      require: true,
    },
    originalname: {
      type: String,
      require: true,
    },
    encoding: {
      type: String,
      require: true,
    },
    mimetype: {
      type: String,
      require: true,
    },
    destination: {
      type: String,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      require: true,
    },
    timeStamp: {
      type: String,
      default: new Date(),
    },
  },
});

const attachmentModel = new mongoose.model(
  "attachmentModel",
  attachmentSchema
);

module.exports = attachmentModel;
