import React, { useEffect, useState } from 'react';
import Product from './product.js';
import axiosInstance from '../api/axiosInstance.js';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let userId = localStorage.getItem('userId');
      try {
        const response = await axiosInstance.get(`products/${userId}`)  

        if (response.statusText === "OK") {
          const data = response.data;
          setProducts(data.finalObject.products);
          setReviews(data.finalObject.ratings);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleRateProduct = (productId, newRating, newReview) => {
    setReviews((preReviews) =>
    preReviews.map((preReview) =>
    preReview.productId === productId ? { ...preReview, rating: newRating, review : newReview } : preReview
      )
    );
  };


  const findRating = (productId) => {
    console.log("enetered");
     let ratingReview = {
      "review" : " ",
      "rating" :" ",
    }
    console.log(ratingReview);
    let userId = localStorage.getItem('userId')

    reviews.map((review) => {
        if(review.productId === productId && review.userId === userId) {
        ratingReview.review = review.review;
        ratingReview.rating = review.rating;
        console.log(ratingReview);
        return ratingReview;
      }
      console.log(ratingReview);
      return ratingReview;
    });
    return ratingReview;
  };

  return (
    <div>
      <h2 id = "productHeading"><center>Product List</center></h2>
     
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            ratingReview = {findRating(product._id)}
            onRateProduct={handleRateProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
