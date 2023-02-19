const { Notices } = require("../models/notice");

const getNotices = category => {
  const filters = { category };

  return Notices.find(filters, "_id title breed location age category");
};

module.exports = {
  getNotices,
};
