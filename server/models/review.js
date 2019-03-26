const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  reviews: []
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
