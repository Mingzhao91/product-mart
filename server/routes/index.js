const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const orderRoutes = require("./order.route");

router.use("/auth", authRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
