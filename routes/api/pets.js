const router = require("express").Router();
const {tryCatchWrapper} = require("../../helpers/tryCatchWrapper");
const {
  addPetСontroller,
  getPetsСontroller,
  removePetСontroller,

} = require("../../controllers/pets.controller");
const { auth } = require("../../middlewares/auth");
const { validateSchema } = require("../../middlewares/validation");
const { petSchema } = require("../../schemas/petSchema");

router.get("/", auth, tryCatchWrapper(getPetsСontroller));
router.post("/", auth, validateSchema(petSchema), tryCatchWrapper(addPetСontroller));
router.delete("/:petId", tryCatchWrapper(removePetСontroller));



module.exports = router;
