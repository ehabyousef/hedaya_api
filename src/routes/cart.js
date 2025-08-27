import express from "express";
import {
  addToCart,
  getAllCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const cartRoute = express.Router();

cartRoute.use(verifyToken);

cartRoute.post("/addToCart", addToCart);
cartRoute.get("/allCart", getAllCart);
cartRoute.delete("/removeFromCart", removeFromCart);
cartRoute.put("/updateQuantity", updateCartQuantity);
