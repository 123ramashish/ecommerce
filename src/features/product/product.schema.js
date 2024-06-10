import mongoose, { mongo } from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  category: String,
  price: Number,
  inStock: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});
