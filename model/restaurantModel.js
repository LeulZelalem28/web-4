const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { 
        type: String, 
        required: true 
    },
  description: {
        type: String,
        required: true,
    },
    rating: { type: Number, default: 0 },
  address: { 
        type: String, 
        required: true 
    },
  contact: { 
    type: String 
    },
  openingHours: { 
    type: String
    },
  category: { 
    type: String 
    },
  foods: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    images: {
      type: [String],
    },
    featuredImages: {
      type: String,
      default:null
    },
//   picture: { type: Buffer },
});

module.exports = mongoose.model("Restaurant", restaurantSchema)