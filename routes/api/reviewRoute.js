const express = require('express');
const { getReviews, postReview, getReviewsByRating, updateReview, deleteReview } = require('../../controllers/reviewController');
const router = express.Router();


router.route('/:restaurant_id').get(getReviews).post(postReview)
router.route('/:restaurant_id/:rating').get(getReviewsByRating);
router.route('/:review_id').put(updateReview).delete(deleteReview)

module.exports = router;