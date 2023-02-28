const { Schema, model } = require("mongoose");

const noticeSchema = Schema(
  {
    category: {
      type: String,
      required: true,
      category: ["sell", "lost-found", "in-good-hands"],
      // default: "sell",
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
    },
    breed: {
      type: String,
      // default: "",
    },
    gender: {
      type: String,
      required: true,
      category: ["male", "female"],
    },
    location: {
      type: String,
      // required: true,
      // default: "",
    },
    price: {
      type: String,
      // default: "",
    },
    image: {
      type: String,
      // default: "",
    },
    comments: {
      type: String,
      // default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Notices = model("notice", noticeSchema);

module.exports = {
  Notices,
};
