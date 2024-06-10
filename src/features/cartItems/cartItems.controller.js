import cartItemsRepository from "./cartitems.repositry.js";
import cartItemsModel from "./cartItems.model.js";
import { applocationError } from "../../error-handler/applicationError.js";
export default class cartItemsController {
  constructor() {
    this.cartItemsRepository = new cartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
      await this.cartItemsRepository.add(productId, userId, quantity);
      res.status(201).send("Cart is updated");
    } catch (err) {
      return res.status(400).send("something went wrong!");
    }
  }
  async get(req, res) {
    try {
      const userId = req.userId;
      const items = await this.cartItemsRepository.getItem(userId);

      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send("something went wrong!");
    }
  }
  async delete(req, res) {
    try {
      const userId = req.userId;
      const cartItemId = req.params.id;
     const isdeleted =  await this.cartItemsRepository.delete(cartItemId,userId);
     if(!isdeleted){
      return res.status(404).send("Item not found!");
     }
      return res.status(200).send("Item deleted");
    } catch (err) {
      return res.status(400).send("something went wrong!");
    }
  }
}
