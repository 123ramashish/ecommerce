import ProductModel from "./product.model.js";
import productRepositry from "./product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepositry = new productRepositry();
  }
  async getAllProducts(req, res) {
    try {
      // Logic to get all products
      const products = await this.productRepositry.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }

  async addProduct(req, res) {
    try {
      // Logic to add a product
      const { name,desc, category,price, sizes  } = req.body;
      // console.log(name, price, sizes, category, description);
      
      const newProduct = new ProductModel(
        name,
        desc,
        req?.file?.filename,
        category,
        parseFloat(price),
        sizes?.split(",")
      );
      const createdRecord = await this.productRepositry.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }
  updateProduct(req, res) {
    // Logic to update a product
  }

  async getOneProduct(req, res) {
    try {
      // Logic to get one product by ID
      const id = req.params.id;
      console.log(id);
      const product = await this.productRepositry.get(id);
      console.log(product);
      if (!product) {
        res.status(404).send("Product not found!");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await this.productRepositry.filterItem(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }
  async rateProduct(req, res,next) {
    try {
      const userId = req.userId;
      const productId = req.body.productId;
      const rating = req.body.rating;

      await this.productRepositry.productRating(userId, productId, rating);
      res.status(200).send("Rating has been added");
    } catch (err) {
      console.log("error passing to middleware!");
      next(err);
    }
  }

  async averagePrice(req,res,next){
    try {
const result = await this.productRepositry.averageProductPricePerCategory();
      res.status(200).send(result);

    } catch (err) {
      console.log("error passing to middleware!");
      next(err);
    }
  }
}
