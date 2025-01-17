// orders.routes.js
const auth = require("../Controllers/user.controller")
const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/order.controller");

router.post("/", auth.authenticate , orderController.createOrder); 

module.exports = router;
