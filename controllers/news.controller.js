const { getNewses } = require("../services/news");

const getNewsController = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    const news = await getNewses(page, limit);
    res.json(news);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNewsController };
