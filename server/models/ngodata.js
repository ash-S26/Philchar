const mongoose = require("mongoose");

const Ngodata = mongoose.Schema({
  ngoname: { type: String, required: true },
  ngoprimaryphone: { type: String, required: true },
  ngosecondaryphone: { type: String, required: true },
  ngoaccountnumber: { type: String, required: true },
  ngoifsc: { type: String, required: true },
  ngobranch: { type: String, required: true },
  ngoid: { type: String, required: true },
  ngoemail: { type: String, required: true },
  ngopassword: { type: String, required: true },
  ngoadd1: { type: String, required: true },
  ngoadd2: { type: String, default: "" },
  ngocity: { type: String, required: true },
  ngostate: { type: String, default: "" },
  ngozip: { type: String, required: true },
  ngotags: { type: [String], required: true },
  video: { type: String, default: "" },
  images: { type: [String], required: true },
  works: { type: [String], default: [] },
});

const Ngo = mongoose.model("Ngo", Ngodata);

module.exports = { Ngo };
