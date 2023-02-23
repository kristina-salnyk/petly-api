const router = require("express").Router();
const { addPet, getPets, removePet } = require("../../controllers/pets.controller");
const { auth } = require("../../middlewares/auth");
const { validateSchema } = require("../../middlewares/validation");
const { uploadCloud } = require("../../middlewares/uploadMiddleware");
const { petSchema } = require("../../schemas/petSchema");

router.get("/", auth, getPets);
router.post("/", auth, uploadCloud.single("petImage"), validateSchema(petSchema), addPet);
router.delete("/:petId", removePet);

module.exports = router;
