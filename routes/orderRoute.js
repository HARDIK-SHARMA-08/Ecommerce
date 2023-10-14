import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getAllOrdersController,
  getOrdersController,
  paymentController,
  tokenController,
} from "../controllers/orderController.js";
import dotenv from "dotenv";

dotenv.config();

const config = {
    headers: {
      'Authorization': `Bearer ${process.env.JWT_SECRET}`,
    },
  };

//Router Object
const router = express.Router();

//Routing
//CHECKOUT TOKEN || METHOD POST
router.get("/checkout/token", requireSignIn, tokenController);

//CHECKOUT PAYMENT || METHOD POST
router.post("/checkout/payment", requireSignIn, paymentController);

//GET ORDER || METHOD GET
router.get("/orders", requireSignIn, getOrdersController);

//GET ALL ORDERS || METHOD GET
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

export default router;
