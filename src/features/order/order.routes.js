import express from "express";
import orderController from "./order.controller.js";
const orderRouter = express.Router();
const OrderController = new orderController();

orderRouter.post("/", (req, res, next) => {
  OrderController.placeOrder(req, res, next);
});

export default orderRouter;
