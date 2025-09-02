import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteWhishlist,
  getAllProd,
  getSingleProd,
  getWishlist,
  updateProduc,
  getFilteredProducts,
  deleteProduct, // New single endpoint
} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  productUpdateValidator,
  productValidator,
} from "../utils/productValidation.js";

export const productRoute = express.Router();

// Add multer middleware to handle form-data with files
const productUpload = upload.fields([
  { name: "defaultImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

productRoute
  .route("/")
  .post(verifyToken, productUpload, validate(productValidator), createProduct)
  .get(getAllProd);

// Single flexible filter endpoint - must come before /:id routes
productRoute.get("/filter", getFilteredProducts);

// Wishlist routes - must come before /:id routes
productRoute.get("/wishlist", verifyToken, getWishlist);
productRoute
  .route("/wishlist/:id")
  .post(verifyToken, addToWishlist)
  .delete(verifyToken, deleteWhishlist);

// Generic ID routes - must come after specific routes
productRoute
  .route("/:id")
  .get(getSingleProd)
  .patch(productUpload, validate(productUpdateValidator), updateProduc)
  .delete(deleteProduct);
