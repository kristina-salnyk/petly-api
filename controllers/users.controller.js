const service = require("../services/users");
const { NotFound, Unauthorized } = require("http-errors");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;

  const { name, email, birthday, phone, city } = req.body;

  if (!_id) {
    throw NotFound(404, "Not found");
  }

  const avatarURL = req.file.path ? req.file.path : "";

  try {
    const result = await service.updateUser(
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
  } catch (error) {
    next(error);
  }
};

const getCurrentUserInfo = async (req, res, next) => {
  console.log(req.user);
  const { _id } = req.user;

  if (!_id) {
    throw Unauthorized(401, "Not found");
  }

  try {
    const result = await service.getCurrentUserInfo(_id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, getCurrentUserInfo };
