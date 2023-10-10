import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { checkoutController } from "../controllers/orderController.js";
import dotenv from "dotenv";

dotenv.config();

//Router Object
const router = express.Router();

//Routing
//PAYMENTS || METHOD POST
router.post("/checkout", requireSignIn, checkoutController);

export default router;
