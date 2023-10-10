import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect Routes
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT token is missing. Please provide a token.",
      });
    }

    // Logging the token and secret for debugging
    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Verify the JWT token
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    // Attach the user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please provide a valid token.",
    });
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
