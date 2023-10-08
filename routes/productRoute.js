import express from "express";
import {
  createProductController,
  deleteProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//Routing
// CREATE PRODUCT || METHOD POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  //Formiadble is used to upload files
  formidable(),
  createProductController
);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET PRODUCTS || METHOD GET
router.get("/get-product", getProductController);

//GET SINGLE PRODUCT || METHOD GET
router.get("/get-product/:slug", getSingleProductController);

//GET PHOTO || METHOD GET
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT || METHOD DELETE
router.delete("/delete-product/:pid", deleteProductController);

//UPDATE PRODUCT || METHOD POST
router.post("/update-product", updateProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);



export default router;
