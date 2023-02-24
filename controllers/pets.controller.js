const service = require("../services/pets");
const { BadRequest, RequestError } = require("http-errors");

const getPets = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const pets = await service.getPets(_id);

    if (!pets) {
      throw RequestError(404);
    }
    res.json(pets);
  } catch (error) {
    next(error);
  }
};

const addPet = async (req, res, next) => {
  const { _id } = req.user;
  const data = req.file ? { petImage: req.file.path, ...req.body } : req.body;
  try {
    const pet = await service.addPet(data, _id);

    if (!pet) {
      throw BadRequest(404, "Not found");
    }
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

const removePet = async (req, res, next) => {
  const { petId } = req.params;
  if (!petId) {
    throw BadRequest(404, "Not found");
  }

  try {
    await service.removePet(petId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPets,
  addPet,
  removePet,
};
