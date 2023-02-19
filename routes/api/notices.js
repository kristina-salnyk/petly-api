const express = require("express");
const noticesRouter = express.Router();

const { auth } = require("../../middlewares/auth");
const { noticesSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const { tryCatchWrapper } = require("../../helpers/tryCatchWrapper");
const {
  getAddedNotices,
  addMyNotices,
  deleteMyNotices,
  getNoticesByCategory,
  getNoticeById,
  addNoticeInFavorites,
  deleteNoticeInFavorites,
  getAllNoticeByFavorites,
} = require("../../controllers/notices.controller");

noticesRouter.get("/own", auth, tryCatchWrapper(getAddedNotices));
noticesRouter.post(
  "/",
  auth,
  uploadCloud.single("image"),
  validateSchema(noticesSchema),
  tryCatchWrapper(addMyNotices)
);
noticesRouter.delete("/:noticesId", auth, tryCatchWrapper(deleteMyNotices));

noticesRouter.get("/", tryCatchWrapper(getNoticesByCategory));
noticesRouter.get("/favorites", auth, tryCatchWrapper(getAllNoticeByFavorites));
noticesRouter.get("/:noticesId", tryCatchWrapper(getNoticeById));
noticesRouter.patch("/favorite/:noticesId", auth, tryCatchWrapper(addNoticeInFavorites));
noticesRouter.delete("/favorite/:noticesId", auth, tryCatchWrapper(deleteNoticeInFavorites));

module.exports = noticesRouter;
