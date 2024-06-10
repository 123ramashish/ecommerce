import express from "express";
import UserController from "./user.controller.js";
import validRegistration from "./user.middleware.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
const userRouter = express.Router();
const userController = new UserController();
userRouter.post("/signup", validRegistration, (req,res,next)=>{
    userController.signup(req,res,next)
});
userRouter.post("/signin", (req,res)=>{
    userController.signin(req,res)})
userRouter.put("/resetPassword", jwtAuth,(req,res)=>{
    userController.resetPassword(req,res)})

    
export default userRouter;
