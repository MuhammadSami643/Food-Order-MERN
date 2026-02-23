const userModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret); // Ensure the secret key is correct
};
module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // With this if any account is exists on this email than we store it in user
      const user = await userModel.findOne({ email });

      //We have to check that the user is exists or not
      if (!user) {
        res.send({
          success: false,
          message: "User does not exist on this email, Please Sign up",
        });
      }

      //If the user exists then we have to compare the entered password and hashed password stored in database
      const isMatch = await bcrypt.compare(password, user.password);

      // Rather the password is correct or not
      if (!isMatch) {
        res.send({
          success: false,
          message: "Invalid Credentials",
        });
      }

      //If user Logged in successfully now we have to create a token for logged in user

      const token = createToken(user._id);

      return res.send({
        success: true,
        token,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error ",
      });
    }
  },

  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      //Checking that is user  alreadt exists on this email
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.send({
          success: false,
          message: "User already exists on this email, Please sign In",
        });
      }

      // Validate email format and strong password
      if (!validator.isEmail(email)) {
        return res.send({
          success: false,
          message: "Enter valid email ",
        });
      }

      //For strong Password

      if (password.length < 8) {
        return res.send({
          success: false,
          message: "Choose a Strong password ",
        });
      }

      //Hashing user password with the help of bcrypt package

      const hash = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, hash);

      //Password is hashed and we have to create a new user with the help of name,email and hashed password

      const newUser = new userModel({
        name: name,
        email,
        email,
        password: hashedPassword,
      });

      //New user is created and we have to save it in the data base model

      const user = await newUser.save(); //User is saved in dataBase and we store it in a varibale named user

      //Now we have to create token for users

      const token = createToken(user._id);

      return res.send({
        success: true,
        token,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: "Error",
      });
    }
  },

  //We take user id and based on user id and create token
};
