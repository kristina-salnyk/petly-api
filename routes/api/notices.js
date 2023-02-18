const express = require("express");
const noticesRouter = express.Router();

const {auth} = require("../../middlewares/auth");
const { noticesSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");

const {tryCatchWrapper} = require("../../helpers/tryCatchWrapper");
const {
  getAddedNotices,
  addMyNotices,
  deleteFavoriteNotices,
  deleteMyNotices,
} = require("../../controllers/notices.controller");

noticesRouter.get("/own", auth, tryCatchWrapper(getAddedNotices));
noticesRouter.post("/", auth, validateSchema(noticesSchema), tryCatchWrapper(addMyNotices));
noticesRouter.delete("/:id", auth, tryCatchWrapper(deleteFavoriteNotices));
noticesRouter.delete("/:id", auth, tryCatchWrapper(deleteMyNotices));

module.exports = noticesRouter;
