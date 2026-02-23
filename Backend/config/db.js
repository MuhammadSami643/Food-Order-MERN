const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://greatclone:great1010clone@cluster0.6h66x.mongodb.net/"
    )
    .then(() => {
      console.log("DB Connected");
    });
};

module.exports = connectDB;
