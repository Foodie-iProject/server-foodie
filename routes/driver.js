const express = require("express");
const Controller = require("../controllers/driverController");
const { authDriver } = require("../middlewares/authentication");
const { authDriverToChangeStatus } = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authDriver);
router.get("/orders", Controller.getAllAvailableOrder);
router.get(
    "/orders/:OrderId",
    Controller.readOrderById
  );
router.patch(
  "/orders/:OrderId",
  authDriverToChangeStatus,
  Controller.takeOrder
);

module.exports = router;
