import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createOrderValidation } from "../utils/orderValidation.js";
import { createOrder, webhook } from "../controllers/orderController.js";

export const orderRoute = express.Router();

orderRoute.post("/", verifyToken, validate(createOrderValidation), createOrder);
orderRoute.post("/webhook", express.raw({ type: "application/json" }), webhook);
