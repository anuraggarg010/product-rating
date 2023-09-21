const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  review: {
     type: String 
  },
  rating: { 
    type: Number, 
    default: 0 
  }, 
  productId: {
    type: String, 
    required: true 
  }  
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
