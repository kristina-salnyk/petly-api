const mongoose = require("mongoose");

const noticesSchema = mongoose.Schema(
  {
    category: {
      type: String,
      default: "sell",
    },
    title: {
      type: String,
      required: [true, "Set title for notices"],
    },
    name: {
      type: String,
      required: [true, "Set name for pets"],
    },
    birthday: {
      type: String,
      default: "10.10.2023",
    },
    breed: {
      type: String,
      default: "Pomeranian",
    },
    gander: {
      type: String,
      default: "Male",
    },
    location: {
      type: String,
      default: "Kyiv",
    },
    price: {
      type: String,
      default: "100",
    },
    image: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Notice = mongoose.model("notices", noticesSchema);

module.exports = {
  Notice,
};
