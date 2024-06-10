import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  likeable: { type: mongoose.Schema.Types.ObjectId, refPath: "types" },
  types: {
    type: String,
    enum: ["products", "categories"],
  },
})
  .pre("save", (next) => {
    console.log("new likes in");
    next();
  })
  .post("save", (doc) => {
    console.log("likes saved" + doc);
  })
  .pre("find", (next) => {
    console.log("Reteriev likes");
    next();
  })
  .post("find", (doc) => {
    console.log("find completed " + doc);
  });
