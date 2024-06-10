import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import userRepository from "./user.repository_new.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepositiory = new userRepository();
  }
  async signup(req, res) {
    try {
      const { name, email, password, type } = req.body;
      // const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, password, type);
      await this.userRepositiory.SignUp(user);
      res.status(201).send(user);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong to signup!");
    }
  }
  async signin(req, res) {
    try {
      const user = await this.userRepositiory.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Invalid Credentials");
      } else {
        const result = bcrypt.compare(req.body.password, user.password);
        if (!result) {
          return res.status(400).send("Invalid Credentials");
        } else {
          var token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "3h",
            }
          );
          return res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong to login!");
    }
  
  }
  async resetPassword(req,res){
     const { newPassword } = req.body;
    //  const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userId = req.userId;
    try {
      await this.userRepositiory.resetPassword(userId, newPassword);
      res.status(200).send('Password updated!')
     } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong to login!");
    }
}
}
