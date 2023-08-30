const express = require("express");
const { addImagesToRestaurant, getAllRestaurants, createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, filterRestaurants, searchRestaurants } = require("../../controllers/restaurantController");
const { uploadImages, uploadFeaturedImage } = require("../../middleware/imageUploadHandler");
const { upload } = require('../../middleware/imageUploadHandler');
const router = express.Router();

router.route('/').get(getAllRestaurants).post(upload.single("featuredImages"), createRestaurant);
//router.route('/').get(getAllRestaurants).post(/*uploadImages, uploadFeaturedImage,*/createRestaurant);
router.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant);
router.route('/filter').post(filterRestaurants);
router.route('/search').post(searchRestaurants)
router.route('/:restaurantId/images').put(addImagesToRestaurant)

module.exports = router;