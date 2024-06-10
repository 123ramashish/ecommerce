export default class cartItemsModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.id = id;
  }

  static add(productId, userId, quantity) {
    const cartItem = new cartItemsModel(productId, userId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
  }

  static getItem(userId) {
    return cartItems.filter((u) => u.userId == userId);
  }

  static delete(cartItemId, userId) {
    const itemIndex = cartItems.findIndex(
      (i) => i.id === cartItemId && i.userId === userId
    );
    if (itemIndex === -1) {
      return "Item does not exist";
    } else {
      cartItems.splice(itemIndex, 1);
    }
  }
}

var cartItems = [
  new cartItemsModel(1, 2, 1, 1),
  new cartItemsModel(1, 1, 2, 2),
];
