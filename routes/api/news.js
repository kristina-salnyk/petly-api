const { getNewsController } = require("../../controllers/news.controller");
const express = require("express");
const router = express.Router();

router.get("/", getNewsController);

module.exports = router;
