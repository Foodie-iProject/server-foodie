const express = require("express");
const DriverController = require("../controllers/driverController");
const { authDriver } = require("../middlewares/authentication");
const { authDriverToChangeStatus } = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", DriverController.register);
router.post("/login", DriverController.login);
router.use(authDriver);
router.get("/orders", DriverController.getAllAvailableOrder);
router.get(
    "/orders/:OrderId",
    DriverController.readOrderById
  );
router.patch(
  "/orders/:OrderId",
  authDriverToChangeStatus,
  DriverController.takeOrder
);

module.exports = router;
