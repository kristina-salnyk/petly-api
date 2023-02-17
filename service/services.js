const { Friends } = require("../models/service");

async function getServices(req, res) {
  const friends = await Friends.find({});
  return friends;
}
  
module.exports ={
  getServices,
}