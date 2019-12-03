const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    front: String,
    back: String
  },
  {
    timestamps: true
  }
);

const CardSetSchema = mongoose.Schema(
  {
    name: String,
    cards: [CardSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const CourseSchema = mongoose.Schema(
  {
    name: String,
    cardSets: [CardSetSchema]
  },
  {
    timestamps: true
  }
);

const Card = mongoose.model("Card", CardSchema);
const CardSet = mongoose.model("CardSet", CardSetSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Card,
  CardSet,
  Course
};
