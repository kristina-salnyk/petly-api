const express = require("express");
const noticesRouter = express.Router();

const { auth } = require("../../middlewares/auth");
const { noticeSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const {
  getFavoriteNotices,
  getMyNotices,
  createNotice,
  deleteMyNotice,
  addNoticeInFavorites,
  deleteNoticeFromFavorites,
  getNoticesByCategory,
  getNoticeById,
} = require("../../controllers/notices.controller");

noticesRouter.post(
  "/",
  auth,
  uploadCloud.single("image"),
  validateSchema(noticeSchema),
  createNotice
);
noticesRouter.get("/favorites", auth, getFavoriteNotices);
noticesRouter.get("/own", auth, getMyNotices);
noticesRouter.get("/:category", getNoticesByCategory);
noticesRouter.get("/:noticeId", getNoticeById);
noticesRouter.delete("/:noticeId", auth, deleteMyNotice);
noticesRouter.patch("/favorite/:noticeId", addNoticeInFavorites);
noticesRouter.delete("/favorite/:noticeId", auth, deleteNoticeFromFavorites);

module.exports = noticesRouter;
