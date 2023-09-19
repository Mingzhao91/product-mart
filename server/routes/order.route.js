const express = require("express");
const asyncHandler = require("express-async-handler");

const orderController = require("../controllers/order.controller");

const router = express.Router();

router.post("/submit", asyncHandler(submitOrder));

async function submitOrder(req, res, next) {
  const orderToSave = req.body;
  console.log("Received order to save is ", orderToSave);

  const order = await orderController.submitOrder(orderToSave);

  return res.status(200).json(order);
}

module.exports = router;
