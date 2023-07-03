const mongoose = require("mongoose");

const donationschema = mongoose.Schema({
  donor: { type: String, required: true },
  to: { type: String, required: true },
  users: { type: [String], required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("donation", donationschema);
