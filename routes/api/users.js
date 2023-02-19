const express = require("express");
const router = express.Router();

const { updateUser, getCurrentInfoUserСontroller } = require("../../controllers/users.controller");
const {tryCatchWrapper} = require("../../helpers/tryCatchWrapper");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");
const { updateUserSchema } = require("../../schemas/updateUserSchema");
const { auth } = require("../../middlewares/auth");

router.patch("/update", auth,uploadCloud.single("ava"), validateSchema(updateUserSchema), tryCatchWrapper(updateUser));
router.get("/", auth, tryCatchWrapper(getCurrentInfoUserСontroller));

module.exports = router;
