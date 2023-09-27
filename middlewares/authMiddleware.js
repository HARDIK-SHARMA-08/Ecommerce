import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect Routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      //Token is saved in header of the file
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //Decrypt
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    //Check if Role == 1 and give access only if that is 1
    if (user.role !== 1) {
      return res.status(404).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }

  } catch (error) {
    console.log(error);
  }
};
