const router = require("express").Router();
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const { addPet, getPets, removePet } = require("../../controllers/pets.controller");

router.post("/pets", tryCatchWrapper(addPet));
router.get("/pets", tryCatchWrapper(getPets));
router.delete("/pets/:petId", tryCatchWrapper(removePet));

module.exports = router;
