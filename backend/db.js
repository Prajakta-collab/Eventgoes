const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI =
   process.env.CON_URL
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongodb Successfully");
  });
};

module.exports = connectToMongo;
