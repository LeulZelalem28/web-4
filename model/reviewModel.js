const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    restaurant_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    comment: { 
        type: String },
})

module.exports = mongoose.model("Review", reviewSchema)