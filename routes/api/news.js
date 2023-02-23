const { getNews } = require("../../controllers/news.controller");
const express = require("express");
const router = express.Router();

router.get("/", getNews);

module.exports = router;
