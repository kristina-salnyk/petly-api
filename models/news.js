const { default: mongoose } = require("mongoose");

const newsSchema = mongoose.Schema(
    
  {
    title: {
      type: String,
      lowercase: true 
    },
    url:{
      type: String,
    },
    description: {
      type: String,
    },
    date:{
      type: Date,
    }
  },
);

const News = mongoose.model("news", newsSchema );

module.exports ={
  News 
}
