const express = require("express");
const noticesRouter = express.Router();

const { auth } = require("../../middlewares/auth");
const { noticesSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");
const upload = require("../../middlewares/uploading");

const {tryCatchWrapper} = require("../../helpers/tryCatchWrapper");
const {
  getAddedNotices,
  addMyNotices,
  deleteFavoriteNotices,
  deleteMyNotices,
} = require("../../controllers/notices.controller");

noticesRouter.get("/own", auth, tryCatchWrapper(getAddedNotices));
noticesRouter.post(
  "/",
  auth,
  upload.single("image"),
  validateSchema(noticesSchema),
  tryCatchWrapper(addMyNotices)
);
noticesRouter.patch("/:noticesId", auth, tryCatchWrapper(deleteFavoriteNotices));
noticesRouter.delete("/:noticesId", auth, tryCatchWrapper(deleteMyNotices));

module.exports = noticesRouter;
