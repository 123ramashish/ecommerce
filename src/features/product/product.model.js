import { applocationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, desc, imageUrl, category, price, sizes, id) {
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
    this.id = id;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return products;
  }

  static get(id) {
    const product = products.find((item) => item.id === id);
    return product;
  }

  static filterItem(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
      );
    });
    return result;
  }

  static getAll() {
    return products;
  }

  static productRating(userId, productId, rating) {
    const user = UserModel.getAll().find((u) => u.id === userId);
    if (!user) {
      throw new applocationError("User not found", 404);
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new applocationError("Product not found", 400);
    }

    if (!product.ratings) {
      product.ratings = [];
    }

    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId === userId
    );
    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = rating;
    } else {
      product.ratings.push({ userId: userId, rating: rating });
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1",
    19.99,
    ["M", "XL"]
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    29.99,
    ["M", "S"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    39.99,
    ["M", "XXL"]
  ),
];
