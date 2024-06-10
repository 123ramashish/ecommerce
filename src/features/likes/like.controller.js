import { likeRepository } from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new likeRepository();
  }

  async likeItems(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userId;

      if (type !== "products" && type !== "categories") {
        return res.status(400).send("Invalid type");
      }

      if (type === "products") {
        await this.likeRepository.likeProducts(userId, id);
      } else {
        await this.likeRepository.likeCategory(userId, id);
      }

      return res.status(200).send("Likes added!");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }
  }

  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(id, type);
      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong!");
    }
  }
}
