const mongoose = require("mongoose");

const notice = mongoose.Schema(
  {
    announcement: {
      type: String,
      //   required: true,
      category: ["sell", "lost/found", "in good hands"],
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
      // required: true
      default: "10.10.2023",
    },
    breed: {
      type: String,
      // required: true
      default: "Pomeranian",
    },
    theSex: {
      // require: true,
      floor: ["Male", "Female"],
    },
    location: {
      type: String,
      // required: true
      default: "Kyiv",
    },
    price: {
      type: String,
      // required: true
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

const Pets = mongoose.model("pets", notice);

module.exports = {
  notice,
};
