const { getPets, addPets, removePets } = require("../service/pets");

const getPetsСontroller = async (req, res) => {
  getPets();
};
const addPetСontroller = async (req, res) => {
  addPets();
};
const removePetСontroller = async (req, res) => {
  removePets();
};
module.exports = {
  getPetsСontroller,
  addPetСontroller,
  removePetСontroller,
};
