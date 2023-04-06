const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/restaurant");

router.post("/register", RestaurantController.register);
router.post("/login", RestaurantController.login);
router.get("/", RestaurantController.getAllRestaurant);
router.get("/food/:id", RestaurantController.getAllFoodPerRestaurant);

module.exports = router;
