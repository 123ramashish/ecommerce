import './.env.js'
import express from "express";
import apiDocs from "./swagger.json" assert { type: "json" };
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.router.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import swagger from "swagger-ui-express";
import cors from "cors";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { applocationError } from "./src/error-handler/applicationError.js";
import { connetToMongoDB } from "./src/config/mongodb.js";
import orderRouter from './src/features/order/order.routes.js';
import likeRouter from './src/features/likes/like.routes.js';
import {connectUsingMongoose} from "./src/config/mongooseConfig.js";
import mongoose from 'mongoose';
const app = express();
//CORS policy configuration
var coreOptions = {
  origin: "http://localhost:5500",
};
app.use(cors(coreOptions));

// app.use((req, res, next) => {
//   res.header("Access-Coontrol-Allow-Origin", "http://localhost:5500");
//   res.header("Access-Coontrol-Allow-Headers", "*");
//   res.header("Access-Coontrol-Allow-Method", "*");
//   //return ok for preflight request
//   if (req.method == "OPTIONS") {
//     res.sendStatus(200);
//   }
//   next();
// });
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Router for products
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use(loggerMiddleware);
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cartItem", jwtAuth, cartRouter);
app.use('/api/orders',jwtAuth,orderRouter)
app.use("/api/likes", jwtAuth,likeRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use((err, req, res, next) => {
  console.log(err);
  if(err instanceof mongoose.Error.ValidationError){
    res.status(400).send(err.message);
  }
  if (err instanceof applocationError) {
    res.status(err.code).send(err.message);
  }
  //server error
  res.status(503).send("something went wrong!");
  next();
});

app.use((req, res) => {
  res.status(404).send("api not found");
});

// const PORT = process.env.PORT || 3200;
app.listen(3200, () => {
  console.log(`Server is running on port 3200`);
  // connetToMongoDB();
  connectUsingMongoose();
});
