const { Pet } = require("../models/pet");
const { BadRequest } = require("http-errors");

const getPets = async owner => {
  return await Pet.find({ owner });
};

const addPet = async ({ ...arg }, owner) => {
  return await Pet.create({
    ...arg,
    owner,
  });
};

const removePet = async petId => {
  const removeUserPet = await Pet.findByIdAndRemove(petId);

  if (!removeUserPet) {
    throw BadRequest(404, "Not found");
  }
};

module.exports = {
  getPets,
  addPet,
  removePet,
};
