const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/driver");


router.post("/register", DriverController.register);
router.post("/login", DriverController.login);

module.exports = router;
