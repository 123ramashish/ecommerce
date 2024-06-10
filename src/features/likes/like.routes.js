import express from "express";
import likeController from "./like.controller.js";
const likecontroller = new likeController();
const likeRouter = express.Router();

likeRouter.post("/", (req, res,next) => {
  likecontroller.likeItems(req, res,next);
});
likeRouter.get("/", (req, res,next) => {
  likecontroller.getLikes(req, res, next);
});



export default likeRouter;