const Review = require('../model/reviewModel')
const User = require('../model/userModel')
const Restaurant = require('../model/restaurantModel')
const getReviews = async (req, res) => {
    const restaurant_id = req.params.restaurant_id
    const foundRestaurant = await Restaurant.find({restaurant_id})
    if(!foundRestaurant) return res.status(404).json({message:"Restaurant not found"})
    const reviews = await Review.find({restaurant_id}).populate('user_id')
    res.sendStatus(200)
}

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
    res.status(200).json({postedReview})
}

module.exports = {getReviews, postReview}