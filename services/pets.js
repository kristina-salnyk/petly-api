const { User } = require("../models/user");
const { Pet } = require("../models/pet");
const { BadRequest } = require("http-errors");

const getPets = async id => {
  return await User.findOne({ _id: id });
};

const addPets = async ({ ...arg }, owner) => {
  const petObj = await Pet.create({
    ...arg,
    owner,
  });

  await User.findByIdAndUpdate(
    { _id: owner },
    { $push: { userPets: petObj } },
    {
      new: true,
    }
  );
  return petObj;
};

const removePets = async (petId, owner) => {
  const removeUserPet = await Pet.findByIdAndRemove(petId);

  if (!removeUserPet) {
    throw BadRequest(404, "Not found");
  }

  await User.findByIdAndUpdate({ _id: owner }, { $pull: { userPets: petId } });
};

module.exports = {
  getPets,
  addPets,
  removePets,
};
