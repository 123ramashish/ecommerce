import { getDB } from "../../config/mongodb.js";
import { applocationError } from "../../error-handler/applicationError.js";


class userRepository {
  constructor(){
    this.collection='users';
  }
  async SignUp(newUser) {
    try {
      // get database
      const db = getDB();
      // get collection
      const collection = db.collection(this.collection);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new applocationError(
        "something went wrong to insert data in collections!",
        500
      );
    }
  }

  async findByEmail(email) {
    try {
      // get database
      const db = getDB();
      // get collection
      const collection = db.collection(this.collection);
    return  await collection.findOne({email});
    } catch (err) {
      console.log(err);
      throw new applocationError(
        "something went wrong to insert data in collections!",
        500
      );
    }
  }
}
export default userRepository;