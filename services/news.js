const { News } = require("../models/news");

const getNews = async (page = 1, limit = 6) => {
  return await News.find({})
    .sort({ date: -1 })
    .skip((parseInt(page) - 1) * limit)
    .limit(limit);
};

module.exports = {
  getNews,
};
