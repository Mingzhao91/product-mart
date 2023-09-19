const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderTotal: {
    type: Number,
    required: true,
  },
  orderSubTotal: {
    type: Number,
    required: true,
  },
  itemsCount: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  estimatedTax: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  itemList: [
    {
      id: String,
      price: Number,
      name: String,
      imgUrl: String,
      quantity: Number,
      itemTotal: Number,
    },
  ],
  cartId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
