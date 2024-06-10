import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { applocationError } from "../../error-handler/applicationError.js";

class cartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);

      await collection.updateOne(
        {
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),
        },
        {
          // $setOnInsert: { _id: id },
          $inc: { quantity: quantity },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      console.log(err);
      throw new applocationError("Something went wrong in cart items", 500);
    }
  }

  async getItem(userId) {
    try {
      //find user and return collections
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: new ObjectId(userId) }).toArray();
    } catch (err) {
      console.log(err);
      throw new applocationError("something wrong in  cartitems ", 500);
    }
  }

  async delete(cartItemId, userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });

      // Check if the deletion was successful
      return result.deletedCount > 0;
    } catch (err) {
      console.error(err);
      throw new applocationError(
        "Something went wrong with the cart items",
        500
      );
    }
  }

  /*
  generate id manually
  // async getNextCounter(db) {
  //   const resultDocument = await db.collection("counters").findOneAndUpdate(
  //     { _id: "cartItemId" },
  //     { $inc: { value: 1 } },
  //     { returnDocument: "after", upsert: true } 
  //   );
  //   return resultDocument.value.value;
  // }
  */
}

export default cartItemsRepository;
