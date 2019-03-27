const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      message: {
        type: String
      },
      rating: {
        type: Number
      }
    }
  ]
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
