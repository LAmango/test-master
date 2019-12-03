const mongoose = require("mongoose");

const UserScheme = mongoose.Schema(
  {
    email: String,
    password: String,
    type: String,
    college: String,
    cardsets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cardset" }]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserScheme);

module.exports = { User };
