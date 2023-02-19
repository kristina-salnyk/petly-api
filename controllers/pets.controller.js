const { getPets, addPets, removePets } = require("../services/pets");
const { BadRequest, Unauthorized, RequestError } = require("http-errors");

const getPetsСontroller = async (req, res) => {
  const { id } = req.user;
  const currentUser = await getPets(id);
  const result = currentUser.userPets;

  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

const addPetСontroller = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    throw Unauthorized(401, "Not found");
  }

  const data = !!req.file ? { petImage: req.file.path, ...req.body } : req.body;

  const result = await addPets(data, owner);
  
  if (!result) {
    throw BadRequest(404, "Not found");
  }
  res.json(result);
};
const removePetСontroller = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    throw Unauthorized(401, "Not found");
  }
  const { petId } = req.params;
  if (!petId) {
    throw BadRequest(404, "Not found");
  }
  await removePets(petId, owner);
  res.status(200).json({ message: "deleted" });
};

module.exports = {
  getPetsСontroller,
  addPetСontroller,
  removePetСontroller,
};
