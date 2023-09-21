
const express = require('express');
const Product = require('../models/product');
const Rating = require('../models/rating');

const router = express.Router();
const app = express();
app.use(express.json());

router.get('/products/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.find();
    const ratings = await Rating.find({"userId" : userId});
    let finalObject = {
      "products" : products,
      "ratings"  : ratings
    }
    res.json({finalObject});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

router.post('/products/:productId', async (req, res) => {
  console.log(req.body)
  try {
    // const requ = req.body
    const {rating, review, userId} = req.body;
    const { productId } = req.params;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let  ratingObj = await Rating.find({$and: [{"userId": userId}, {"productId": productId}]});

    if(ratingObj[0]) {
      ratingObj[0].review = review;
      ratingObj[0].rating = rating;
      await ratingObj[0].save();
    } else {
      let ratingObject = new Rating(
    {
      "review" : review,
     "rating" : rating, 
     "productId" : productId, 
     "userId" : userId
    });
      await ratingObject.save();
    }

    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;
