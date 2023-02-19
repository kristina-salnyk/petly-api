const { User } = require("../models/user");
const { NotFound, Unauthorized } = require("http-errors");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const { name, email, birthday, phone, city } = req.body;

  if (!_id) {
    throw NotFound(404, "Not found");
  }

  const avatarURL = req.file.path ? req.file.path : "";

  const result = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      birthday,
      phone,
      city,
      avatarURL,
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw NotFound(404, "Not found");
  }
  res.json(result);
};

const getCurrentInfoUserСontroller = async (req, res) => {
  const { id: owner } = req.user;

  if (!owner) {
    throw Unauthorized(401, "Not found");
  }

  const result = await User.findById(owner);
  res.json(result);
};

module.exports = { updateUser, getCurrentInfoUserСontroller };
