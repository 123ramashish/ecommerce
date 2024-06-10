import orderRepository from "./order.repository.js";

export default class orderController {
  constructor() {
    this.orderRepository = new orderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.userId;
      await this.orderRepository.placeOrder(userId);
      res.status(201).send("Order created!");
    } catch (err) {
      console.log(err);
      res.status(500).send("something went wrong!");
    }
  }
}
