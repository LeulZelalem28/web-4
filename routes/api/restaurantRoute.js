const express = require("express");
const { getAllRestaurants, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, filterRestaurants, searchRestaurants } = require("../../controllers/restaurantController");
const router = express.Router();

router.route('/').get(getAllRestaurants).post(createRestaurant);
router.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant);
router.route('filter').post(filterRestaurants);
router.route('/search').post(searchRestaurants)

module.exports = router;