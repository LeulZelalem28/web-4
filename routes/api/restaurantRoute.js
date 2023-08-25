const express = require("express");
const { getAllRestaurants, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, filterRestaurants, searchRestaurants } = require("../../controllers/restaurantController");
const { uploadImages, uploadFeaturedImage } = require("../../middleware/imageUploadHandler");
const router = express.Router();

router.route('/').get(getAllRestaurants).post(uploadImages, uploadFeaturedImage, createRestaurant);
router.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant);
router.route('/filter').post(filterRestaurants);
router.route('/search').post(searchRestaurants)

module.exports = router;