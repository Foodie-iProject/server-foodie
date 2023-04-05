const express = require("express");
const { authCust } = require("../middlewares/authentication");
const OrderController = require("../controllers/order");
const router = express.Router();

router.post("/placeOrder", authCust, OrderController.createOrder);
router.get("/list", authCust, OrderController.getAllCustomerOrder);
router.get("/:OrderId", OrderController.getCustomerOrderById);
router.patch("/:OrderId", OrderController.changeStatus);

module.exports = router;
