const service = require("../services/services");

const getServices = async (req, res, next) => {
  const { page, limit } = req.query;

  try {
    const friends = await service.getServices(page, limit);
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices };
