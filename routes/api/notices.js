const express = require("express");
const noticesRouter = express.Router();

const { auth } = require("../../middlewares/auth");
const { noticeSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");

const { tryCatchWrapper } = require("../../helpers/tryCatchWrapper");
const {
  getAddedNotices,
  createNoticeController,
  deleteMyNotices,
  getNoticesByParameter,
  addNoticeInFavorites,
  deleteNoticeInFavorites,
} = require("../../controllers/notices.controller");

noticesRouter.post(
  "/",
  auth,
  uploadCloud.single("image"),
  validateSchema(noticeSchema),
  tryCatchWrapper(createNoticeController)
);


noticesRouter.get("/:parameter", getNoticesByParameter);

noticesRouter.get("/own", auth, tryCatchWrapper(getAddedNotices));

noticesRouter.delete("/:noticesId", auth, tryCatchWrapper(deleteMyNotices));


noticesRouter.patch("/favorite/:noticesId", auth, tryCatchWrapper(addNoticeInFavorites));
noticesRouter.delete("/favorite/:noticesId", auth, tryCatchWrapper(deleteNoticeInFavorites));

module.exports = noticesRouter;
