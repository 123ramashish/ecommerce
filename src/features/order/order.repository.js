import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { applocationError } from "../../error-handler/applicationError.js";
import orderModel from "./order.model.js";
export default class orderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    //  await client.connect();
    const session = client.startSession();
    try {
      const db = getDB();

      session.startTransaction();

      const items = await this.getTotalAmount(userId, session);
      let finalTotalAmount = 0;
      items.forEach((item) => {
        finalTotalAmount += item.totalAmount;
      });

      const newOrder = new orderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, session);

      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productId },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }
      throw new Error("something wrong in placeOrder!");
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });
      session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error in placeOrder:", error);
      throw new Error("Something went wrong in placing the order");
    }
  }

  async getTotalAmount(userId, session) {
    try {
      const db = getDB();
      const items = await db
        .collection("cartItems")
        .aggregate(
          [
            { $match: { userId: new ObjectId(userId) } },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo",
              },
            },
            { $unwind: "$productInfo" },
            {
              $addFields: {
                totalAmount: { $multiply: ["$productInfo.price", "$quantity"] },
              },
            },
          ],
          { session }
        )
        .toArray();

      // Calculate total amount

      return items;
      // You can return the total amount here or do something else with it
    } catch (err) {
      console.log(err);
      throw new applocationError("Something went wrong in cart items", 500);
    }
  }
}
