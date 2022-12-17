const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
