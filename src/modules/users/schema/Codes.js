const mongoose = require("mongoose");

const reqType = {
  type: mongoose.SchemaTypes.String,
  required: true,
};
const codesSchema = new mongoose.Schema({
  number: reqType,
  expaired: reqType,
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  code: reqType,
});

const Codes = mongoose.model("Codes", codesSchema);

module.exports = Codes;
