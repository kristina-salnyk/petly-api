const { getServices } = require("../services/services");

const getServicesController = async (req, res, next) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const friends = await getServices(skip, limit);
    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

module.exports = { getServicesController };
