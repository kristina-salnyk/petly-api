const express = require("express");
const noticesRouter = express.Router();

// const auth = require("../../middlewares/auth");
const { noticesSchema } = require("../../schemas/noticeSchema");
const { validateSchema } = require("../../middlewares/validation");

const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const {
  getAddedPets,
  addMyPets,
  deleteFavoritePets,
  deleteMyPets,
} = require("../../controllers/notices.controller");

noticesRouter.get("/own", auth, tryCatchWrapper(getAddedPets));
noticesRouter.post("/", auth, validateSchema(noticesSchema), tryCatchWrapper(addMyPets));
noticesRouter.delete("/:id", auth, tryCatchWrapper(deleteFavoritePets));
noticesRouter.delete("/:id", auth, tryCatchWrapper(deleteMyPets));

module.exports = noticesRouter;
