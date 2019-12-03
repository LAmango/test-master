const mongoose = require("mongoose");

const ServiceScheme = mongoose.Schema(
  {
    title: String,
    description: String
  },
  {
    timestamps: true
  }
);
const Service = mongoose.model("Service", ServiceScheme);

module.exports = { Service };
