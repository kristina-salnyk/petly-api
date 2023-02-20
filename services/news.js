const {News} = require("../models/news");

async function getNewses(page = 1, limit = 6) {
  const news = await News.find({}).skip((parseInt(page) - 1) * limit).limit(limit);
  return news;
}
  
module.exports ={
  getNewses,
}