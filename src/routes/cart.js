import express from "express";
import {
  addToCart,
  getAllCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

export const cartRoute = express.Router();

cartRoute.use(verifyTokenAndAuthorization);

cartRoute.post("/addToCart", addToCart);
cartRoute.get("/allCart", getAllCart);
cartRoute.post("/removeFromCart", removeFromCart);
