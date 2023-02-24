const { User } = require("../models/user");

const getUserByEmail = async email => {
  return await User.findOne({ email });
};

const createUser = async fields => {
  return await User.create(fields);
};

const updateUser = async (userId, fields) => {
  return await User.findByIdAndUpdate(userId, fields, {
    new: true,
    runValidators: true,
  });
};

const updateToken = async (userId, fields) => {
  return await User.findByIdAndUpdate(userId, fields, {
    new: true,
  });
};

const getUserByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const getCurrentUserInfo = async id => {
  return await User.findById(id);
};

module.exports = {
  updateToken,
  getUserByEmail,
  createUser,
  updateUser,
  getUserByVerificationToken,
  getCurrentUserInfo,
};
