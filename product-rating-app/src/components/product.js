import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axiosInstance from '../api/axiosInstance';


function Product({ product, ratingReview, onRateProduct }) {
  const userId = localStorage.getItem('userId');
  const [rating, setRating] = useState(ratingReview.rating);
  const [review, setReview] = useState(ratingReview.review);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRateProduct = async () => {
    setOpen(false);
    const isAuthenticated = localStorage.getItem("token") !== null;

    if (!isAuthenticated) {
      alert("Login Again");
      window.location = "/login";
      alert("Please log in to rate the product.");
      return;
    }
    try {
      const response = await axiosInstance.post(`products/${product._id}`, {
        rating: rating,
        review: review,
        userId: userId 
      })
      .then( (response) => {
        console.log(response);
      })
      
      if (response.statusText === "OK") {
        onRateProduct(product._id, rating, review);
        setRating(0);
      } else {
        alert("Fill rating properly");
        console.error("Rating failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        id="cardimage"
        sx={{ height: 140 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent id="productMain">
        <Typography gutterBottom variant="h5" component="div" id="productName">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" id="productDesc">
          Review: {ratingReview.review}
        </Typography>
        <Typography variant="body2" color="text.secondary" id="productRating">
          Rating: <bold>{ratingReview.rating}</bold>
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Review & Rating
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Review and Rating</DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                <Rating
                  name="size-large"
                  defaultValue={ratingReview.rating}
                  size="large"
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </Stack>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Review"
                type="review"
                fullWidth
                variant="standard"
                onChange={(e) => setReview(String(e.target.value))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRateProduct} id="rate-button">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </CardActions>
    </Card>
  );
}

export default Product;
