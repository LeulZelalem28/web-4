const Review = require('../model/reviewModel')
const User = require('../model/userModel')
const Restaurant = require('../model/restaurantModel')


const getReviews = async (req, res) => {
    const restaurant_id = req.params.restaurant_id
    const sort = req.query.sort || 'newest'; // Default sort order is 'newest'
    const foundRestaurant = await Restaurant.find({restaurant_id})
    if(!foundRestaurant) return res.status(404).json({message:"Restaurant not found"})
    let sortOption;
  if (sort === 'oldest') {
    sortOption = { createdAt: 1 };
  } else {
    sortOption = { createdAt: -1 };
  }

  const reviews = await Review.find({ restaurant_id }).sort(sortOption)
    // const reviews = await Review.find({restaurant_id}).populate('user_id')
    res.sendStatus(200).json({reviews})
}

// GET /reviews/:restaurant_id/:rating
const getReviewsByRating = async (req, res) => {
  try {
    const restaurant_id = req.params.restaurant_id
    const foundRestaurant = await Restaurant.findOne({restaurant_id})
    if(!foundRestaurant) return res.status(404).json({message:"Restaurant not found"})
    const rating = parseInt(req.params.rating);
    const reviews = await Review.find({ restaurant_id, rating })
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const postReview = async (req, res) => {
    const restaurant_id = req.params.restaurant_id
    const user_id = req.userInfo.id
    const { rating, comment } = req.body
    const foundRestaurant = await Restaurant.findOne({restaurant_id})
    if(!foundRestaurant) return res.status(404).json({message:"Restaurant not found"})
    const alreadyPosted = await Review.findOne({restaurant_id, user_id})
    if(alreadyPosted) return res.status(409).json({message: "User has already posted a comment"})
    const postedReview = await Review.create({
        user_id,
        restaurant_id,
        rating,
        comment
        })
    const reviews = await Review.find({restaurant_id});
    const totalRatings = reviews.reduce((sum, review) => {
        sum += review.rating
    },0)
    const averageRating = totalRatings/reviews.length
    foundRestaurant.rating = averageRating;
    await foundRestaurant.save()
    res.status(200).json({postedReview})}


  const updateReview = async (req, res) => {
        const review_id = req.params.review_id;
        const user_id = req.userInfo.id
        const { rating, comment } = req.body

        const review = await Review.findById(review_id)
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
          }
        if (review.user_id !== user_id) {
            return res.status(403).json({ error: 'You are not authorized to update this review' });
          }  
        const updatedReview = await Review.findByIdAndUpdate(
            review_id, 
            { rating, comment }, 
            { new: true });
        const restaurant_id = review.restaurant_id
        //const reviews = await Review.find({restaurant_id: review.restaurant_id}) 
        const reviews = await Review.find({restaurant_id}) 
        const totalRatings = review.reduce((sum, review) => {
            sum += review.rating
        },0)
        const averageRating = totalRatings/reviews.length
        const foundRestaurant = await Restaurant.find({_id: restaurant_id})
        foundRestaurant.rating = averageRating;
        await foundRestaurant.save()
        res.status(200).json({updatedReview});
    }


const deleteReview = async (req, res) =>{
    const review_id = req.params.review_id;
    const user_id = req.userInfo.id
    const review = await Review.findById(review_id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.user_id !== user_id) {
        return res.status(403).json({ error: 'You are not authorized to update this review' });
      }
      const result = await Review.deleteOne({ _id: review_id });
    res.status(200).json({ message: 'Review deleted' });
  } 
  


module.exports = { getReviews, getReviewsByRating, postReview, updateReview, deleteReview }