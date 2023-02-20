const {News} = require("../models/news");

async function getNewses(page, limit) {
  const news = await News.find({}).skip((parseInt(page) - 1) * limit).limit(limit);
  return news;
}
  
module.exports ={
  getNewses,
}