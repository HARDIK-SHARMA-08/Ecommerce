import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  allCategoryControllers,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router Object
const router = express.Router();

//Routing
//CREATE CATEGORY || METHOD POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY || METHOD PUT
router.post(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//GET ALL CATEGORY || METHOD GET
router.get("/get-category", allCategoryControllers);

//SINGLE CATEGORY || METHOD GET
router.get("/single-category/:slug", singleCategoryController);

//DELETE CATEGORY || METHOD DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
