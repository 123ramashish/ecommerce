import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose!");
    addCategories();
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
  }
};

async function addCategories() {
  const categoryModel = mongoose.model("categories", categorySchema);

  const categories = await categoryModel.find();

  if (!categories || categories.length === 0) {
    await categoryModel.insertMany([
      { name: "Books" },
      { name: "Clothing" },
      { name: "Electronics" },
    ]);
    console.log("Categories added!");
  } else {
    console.log("Categories already exist!");
  }
}

