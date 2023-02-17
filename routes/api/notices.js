const express = require("express");
const { getNotices, getNotice } = require("../../controllers/notices.controller");

const moticesRouter = express.Router();

moticesRouter.get("/", getNotices);
moticesRouter.get("/:noticeId", getNotice);

module.exports = moticesRouter;
