import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { applocationError } from "../../error-handler/applicationError.js";

const userModel = mongoose.model("users", userSchema);

export default class userRepository {
  async SignUp(user) {
    try {
      const newuser = new userModel(user);
      await newuser.save();
      return newuser;
    } catch (err) {
        if(err instanceof mongoose.Error.ValidationError){
            console.log(err);
            throw err;
        }else{
console.log(err);
throw new applocationError(
  "something went wrong to insert data in user collections!",
  500
);
        }
      
    }
  }
  async signIn(email, password) {
    try {
      return await userModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new applocationError("something went wrong to signin user!", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new applocationError(
        "something went wrong to finding email in user collections!",
        500
      );
    }
  }

  async resetPassword(userId, hashedPassword) {
    try {
      const user = await userModel.findById(userId);
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("no such user exist!");
      }
    } catch (err) {
      console.log(err);
      throw new applocationError(
        "something went wrong to reset password  in user collections!",
        500
      );
    }
  }
}
