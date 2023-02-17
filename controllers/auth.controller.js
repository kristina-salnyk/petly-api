const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Conflict, Unauthorized } = require("http-errors");
const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw Conflict(409, "Email in use");
  }
  if (password.length < 7) {
    res.status(400);
    throw new Error("Password must be at least 7 characters long");
  }
  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashPassword,
    name,
    city,
    phone,
    avatarURL,
  });

  const payload = {
    id: result._id,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(result._id, { token });

  res.status(201).json({
    user: {
      id: result._id,
      email: result.email,
      name: result.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw Unauthorized(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw Unauthorized(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      id: user._id,
      email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = { register, login, logout };
