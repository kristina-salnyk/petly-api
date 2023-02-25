const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const user = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return next();
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { user };
