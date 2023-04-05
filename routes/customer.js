const express = require("express");
const router = express.Router();
const { authCust } = require("../middlewares/authentication");
const CustomerController = require("../controllers/customer");
const { authCustomerToComplete } = require("../middlewares/authorization");

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.use(authCust);
router.post("/placeOrder", CustomerController.createOrder);
router.get("/orders/list", CustomerController.getAllCustomerOrder);
router.get("/orders/:OrderId", CustomerController.getCustomerOrderById);
router.patch(
  "/orders/:OrderId",
  authCustomerToComplete,
  CustomerController.completedOrder
);

module.exports = router;
