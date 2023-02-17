const express = require("express");
const router = express.Router();

const { updateUser } = require("../../controllers/users.controller");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const validation = require("../../middlewares/validation");
const { updateUserSchema } = require("../../schemas/updateUserSchema");
const { auth } = require("../../middlewares/auth");

router.patch("/update", auth, validation(updateUserSchema), tryCatchWrapper(updateUser));

module.exports = router;
