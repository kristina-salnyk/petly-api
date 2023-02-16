const router = require("express").Router();
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const {
  addPetСontroller,
  getPetsСontroller,
  removePetСontroller,
} = require("../../controllers/pets.controller");

router.get("/", tryCatchWrapper(getPetsСontroller));
router.post("/", tryCatchWrapper(addPetСontroller));
router.delete("/:petId", tryCatchWrapper(removePetСontroller));

module.exports = router;
