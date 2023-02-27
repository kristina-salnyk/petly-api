const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    city: {
      type: String,
      // required: [true, "City is required"],
    },
    phone: {
      type: String,
      // required: [true, "Phone is required"],
    },
    birthday: {
      type: Date,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "notice" }],
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = { User };
