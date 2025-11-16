const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  chat: {
    type: String,
    require: true,
  },
  attachmentId: {
    _id: {
      type: String,
      require: false,
    },
  },
  response: {
    type: String,
    default: "",
  },
  timeStamp: {
    type: String,
    default: new Date(),
  },
});

const chatModel = new mongoose.model("chatModel", chatSchema);
module.exports = chatModel;
