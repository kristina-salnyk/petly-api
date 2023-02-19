const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    favorites: [{ type: Schema.ObjectId, ref: "notices" }],
    userPets: [{ type: Schema.ObjectId, ref: "pet" }],
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = { User };
