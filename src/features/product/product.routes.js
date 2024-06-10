import express from "express";
import ProductController from "./product.controller.js";
import { uploads } from "../../middlewares/fileupload.middleware.js";
const productRouter = express.Router();
const productController = new ProductController();

productRouter.post("/rate", (req, res, next) => {
  productController.rateProduct(req, res, next);
});
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
// localhost:3200/api/products/filter?minPrice=10&maxPrice=50&category=category2
productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/", uploads.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

// router.put("/:id", productController.updateProduct);

export default productRouter;
