const service = require("../services/services");

const getServices = async (req, res, next) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const friends = await service.getServices(skip, limit);
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices };
