const mongoose = require("mongoose");

const messageschema = mongoose.Schema({
  text: { type: String, required: true },
  users: { type: [String], required: true },
  sender: { type: String, required: true },
});

module.exports = mongoose.model("message", messageschema);
