const { default: mongoose } = require("mongoose");

const servicesSchema = mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  workDays: {
    type: Array,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Friends = mongoose.model("friend", servicesSchema);

module.exports = {
  Friends,
};
