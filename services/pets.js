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
  const petToRemove = await Pet.findById(petId);

  if (!petToRemove) {
    throw BadRequest(404, "No such user in database");
  }

  return await Pet.findOneAndDelete({ _id: petId });
};

module.exports = {
  getPets,
  addPet,
  removePet,
};
