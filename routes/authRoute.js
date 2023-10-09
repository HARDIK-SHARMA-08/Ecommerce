import express from "express";
import {
  registerController,
  loginController,
  testController,
  getOrdersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router Object
const router = express.Router();

//Routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//TEST || MEHTOD GET
router.get("/test", requireSignIn, isAdmin, testController);

//PROTECTED USER ROUTE || METHOD GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ADMIN ROUTE || METHOD GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ORDER ROUTE || METHOD GET
router.get("/order", requireSignIn, getOrdersController);

export default router;
