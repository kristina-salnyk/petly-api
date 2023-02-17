const {News} = require("../models/news");

  async function getNewses(req, res) {
    const news = await News.find({});
    return news;
  }
  
  module.exports ={
    getNewses,
  }