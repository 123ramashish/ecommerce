import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { applocationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";

const productModel = mongoose.model("products", productSchema);
const reviewModel = mongoose.model("reviews", reviewSchema);
const categoryModel = mongoose.model("categories", categorySchema);
class productRepositry {
  constructor() {
    this.collection = "products";
  }
  async add(productdata) {
    try {
      //mogodb
      // const db = getDB();
      // const collection = db.collection(this.collection);
      // await collection.insertOne(product);
      // return product;

      //mongoose
      productdata.category = productdata.category.split(",").map(e=>e.trim());
      const newProduct = new productModel(productdata);
      const saveProducts = await newProduct.save();
      await categoryModel.updateMany(
        {
          _id: { $in: productdata.category },
        },
        {
          $push: { products: new ObjectId(saveProducts._id) },
        }
      );
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  product ", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  product ", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  product ", 500);
    }
  }

  async filterItem(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = {
          $gte: parseFloat(minPrice),
        };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.Category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  product ", 500);
    }
  }

  //   async productRating(userId, productId, rating) {
  //     try {
  //       const db = getDB();
  //       const collection = db.collection(this.collection);
  //       const product = await collection.findOne({
  //         _id: new ObjectId(productId),
  //       });

  //       if (product) {
  //         const userRatingIndex = product.ratings.findIndex(
  //           (r) => r.userId.toString() === userId
  //         );
  //         if (userRatingIndex !== -1) {
  //           await collection.updateOne(
  //             {
  //               _id: new ObjectId(productId),
  //               "ratings.userId": new ObjectId(userId),
  //             },
  //             {
  //               $set: { "ratings.$.rating": rating },
  //             }
  //           );
  //         } else {
  //           await collection.updateOne(
  //             { _id: new ObjectId(productId) },
  //             { $push: { ratings: { userId: new ObjectId(userId), rating } } }
  //           );
  //         }
  //       } else {
  //         throw new Error("Product not found");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       throw new applocationError("Something went wrong with the product", 500);
  //     }
  //   }

  async productRating(userId, productId, rating) {
    try {
      //mongodb code

      // const db = getDB();
      // const collection = db.collection(this.collection);

      // // Pull the existing rating for the user
      // await collection.updateOne(
      //   {
      //     _id: new ObjectId(productId),
      //   },
      //   {
      //     $pull: { ratings: { userId: new ObjectId(userId) } },
      //   }
      // );

      // // Push the new rating for the user
      // await collection.updateOne(
      //   { _id: new ObjectId(productId) },
      //   { $push: { ratings: { userId: new ObjectId(userId), rating } } }
      // );

      // mongoose code
      const productToUpdate = await productModel.findById(productId);
      if (!productToUpdate) {
        throw new Error("Product not found!");
      }

      const userReview = await reviewModel.findOne({
        product: new ObjectId(productId),
        user: new ObjectId(userId),
      });

      if (userReview) {
        // Update the existing review
        userReview.rating = rating;
        await userReview.save();
      } else {
        // Create a new review
        const newUserReview = new reviewModel({
          product: new ObjectId(productId),
          user: new ObjectId(userId),
          rating: rating,
        });
        await newUserReview.save();
      }
    } catch (err) {
      console.error(err);
      throw new applocationError("Something went wrong with the product", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.error(err);
      throw new applocationError("Something went wrong with the product", 500);
    }
  }
}
export default productRepositry;
