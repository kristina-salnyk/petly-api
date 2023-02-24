const express = require("express");
const router = express.Router();

const { updateUser, getCurrentUserInfo } = require("../../controllers/users.controller");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");
const { updateUserSchema } = require("../../schemas/updateUserSchema");
const { auth } = require("../../middlewares/auth");

router.patch(
  "/update",
  auth,
  uploadCloud.single("avatarUrl"),
  validateSchema(updateUserSchema),
  updateUser
);
router.get("/current", auth, getCurrentUserInfo);

module.exports = router;
