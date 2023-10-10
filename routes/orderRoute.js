import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { checkoutController, getAllOrdersController, getOrdersController, paymentController } from "../controllers/orderController.js";
import dotenv from "dotenv";

dotenv.config();

//Router Object
const router = express.Router();

//Routing
//CHECKOUT || METHOD POST
router.post("/checkout", requireSignIn, checkoutController);

//GET ORDER || METHOD GET
router.get("/orders", requireSignIn, getOrdersController);

//GET ALL ORDERS || METHOD GET
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//PAYMENT || METHOD POST
router.post("/payment-intent", paymentController)

export default router;
