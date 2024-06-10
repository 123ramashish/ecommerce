import express from "express";
import cartItemsController from "./cartItems.controller.js";

const cartController = new cartItemsController();
const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
  cartController.get(req, res);
});
cartRouter.post("/", (req, res) => {
  cartController.add(req, res);
});
cartRouter.delete("/:id", (req, res) => {
  cartController.delete(req, res);
});

export default cartRouter;
