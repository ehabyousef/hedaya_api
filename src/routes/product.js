import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteWhishlist,
  getAllProd,
  getSingleProd,
  updateProduc,
  wishlist,
} from "../controllers/productController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";
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

productRoute
  .route("/:id")
  .get(getSingleProd)
  .patch(productUpload, validate(productUpdateValidator), updateProduc);

productRoute
  .route("/wishlist")
  .get(verifyTokenAndAuthorization, wishlist)
  .post(verifyTokenAndAuthorization, addToWishlist)
  .delete(verifyTokenAndAuthorization, deleteWhishlist);
