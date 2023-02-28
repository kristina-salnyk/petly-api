const express = require("express");
const router = express.Router();

const {
  updateUser,
  refreshUser,
  getCurrentUserInfo,
} = require("../../controllers/users.controller");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");
const { updateUserSchema } = require("../../schemas/updateUserSchema");
const { auth } = require("../../middlewares/auth");

router.patch(
  "/update",
  auth,
  uploadCloud.single("avatarURL"),
  validateSchema(updateUserSchema),
  updateUser
);
router.get("/refresh", auth, refreshUser);
router.get("/current", auth, getCurrentUserInfo);

module.exports = router;
