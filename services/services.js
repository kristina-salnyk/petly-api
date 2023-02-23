const { Friends } = require("../models/service");

const getServices = async (page = 1, limit = 6) => {
  return await Friends.find({}).skip((parseInt(page) - 1) * limit);
};

module.exports = {
  getServices,
};
