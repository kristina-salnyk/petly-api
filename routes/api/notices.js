const express = require("express");
const router = express.Router();

// const auth = require("../../middlewares/auth");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const {
  getAddedPets,
  addMyPets,
  deleteFavoritePets,
  deleteMyPets,
} = require("../../controllers/notices.controller");

router.get("/own", auth, tryCatchWrapper(getAddedPets));
router.post("/", auth, tryCatchWrapper(addMyPets));
router.delete("/:id", auth, tryCatchWrapper(deleteFavoritePets));
router.delete("/:id", auth, tryCatchWrapper(deleteMyPets)); 

module.exports = router;
