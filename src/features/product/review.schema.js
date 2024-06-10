import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  products: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  rating:  Number,
});



