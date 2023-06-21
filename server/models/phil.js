const mongoose = require("mongoose");

const Phildata = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  tags: { type: [String], required: true },
  works: { type: [String], required: true },
  vision: { type: String, required: true },
  donated: { type: Number, default: 0 },
});

const Phil = mongoose.model("Philantropist", Phildata);

module.exports = { Phil };
