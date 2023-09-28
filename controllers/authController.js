import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

//Registration Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    //Validation
    if (!name || !email || !password || !phone) {
      return res.send({message:"Please fill the fields"});
    }

    //Check for User
    const existingUser = await userModel.findOne({ email });
    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered User",
      });
    }

    //Register User
    const hashedPassword = await hashPassword(password);
    //Saving User
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.send("Invalid Email or Password");
    }

    //Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(300).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Test Controller
export const testController = (req, res) => {
  res.send({ message: "Protected Route" });
};
