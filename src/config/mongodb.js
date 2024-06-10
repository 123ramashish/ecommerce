import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
let client;
export const connetToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Database connected");
      // createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err.message);
    });
};


export const getDB = () => {
  return client.db();
};

/*
// manuaaly generate id 

// const createCounter = async (db) => {
//   const existingCounter = await db
//     .collection("counters")
//     .findOne({ _id: "cartItemId" });
//   if (!existingCounter) {
//     await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
//   }
// }
*/

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });

    console.log("indexes created");
  } catch (err) {
    console.log(err);
  }
};
export const getClient = () => {
  return client;
};