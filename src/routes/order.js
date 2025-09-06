import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validate } from "../middlewares/validateMiddleware";
import { createOrderValidation } from "../utils/orderValidation";
import { createOrder, webhook } from "../controllers/orderController";

export const orderRoute = express.Router();

orderRoute.post("/", verifyToken, validate(createOrderValidation), createOrder);
orderRoute.post("/webhook", express.raw({ type: "application/json" }), webhook);
