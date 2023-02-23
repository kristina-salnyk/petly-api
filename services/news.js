const { News } = require("../models/news");

const getNews = async (page = 1, limit = 6) => {
  return await News.find({})
    .skip((parseInt(page) - 1) * limit)
    .limit(limit);
};

module.exports = {
  getNews,
};
