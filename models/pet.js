const { Schema, model } = require("mongoose");

const petSchema = new Schema(
{
  name: {
    type: String,
  },
  birthday: {
    type: String,
  },
  breed: {
    type: String,
  },
  comments: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  petImage: {
    type: String,
  },
});

const Pet = model("pet", petSchema);

module.exports = { Pet };
