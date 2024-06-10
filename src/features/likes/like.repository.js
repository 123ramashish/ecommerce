import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
const likeModel = mongoose.model("likes", likeSchema);
export class likeRepository {
  async getLikes(id, type) {
    return await likeModel
      .find({
        likeable: new ObjectId(id),
        types: type,
      })
      .populate("users")
      .populate({ path: "likeable", model: type });
  }
  async likeProducts(userId, productId) {
    try {
      const newLike = new likeModel({
        users: new ObjectId(userId),
        likeable: new ObjectId(productId),
        types: "products",
      });
      await newLike.save();
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  likes ", 500);
    }
  }
  async likeCategory(userId, categoryId) {
    try {
      const newLike = new likeModel({
        users: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        types: "categories",
      });
      await newLike.save();
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  likes ", 500);
    }
  }
}
