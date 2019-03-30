const Review = require("../models/review");
const Order = require("../models/order");
// const User = require("../models/user");
// const Product = require("../models/product");

module.exports = {
  addReview: async (req, res) => {
    let ordersDoc = await Order.find({ user: req.user.id });
    let bought = false;

    ordersDoc[0].orders.forEach(product => {
      product.filter(el => {
        if (el.product._id == req.body.productID) {
          bought = true;
        }
      });
    });
    console.log("bought ", bought);

    if (bought) {
      const user = req.user.id;
      const { productID, message, rating } = req.body;
      const review = {
        user: user,
        message: message,
        rating: rating
      };

      Review.findOne({ product: productID }).then(foundReview => {
        if (foundReview) {
          foundReview.reviews.push(review);
          foundReview.save().then(() => res.status(200).json("Review Added"));
        } else {
          Review.create({
            product: productID,
            reviews: [review]
          }).then(() => res.status(200).json("Review Created"));
        }
      });
    } else {
      res.status(200).json("Buy Product To Leave Review");
    }
  },
  getReviews: async (req, res) => {
    Review.findOne({ product: req.params.id }, function(err, result) {
      if (err) {
        return res.send({ reviews: [], rating: 0 });
      }
      if (!result) {
        return res.send({ reviews: [], rating: 0 });
      } else {
        ////////////////
        Review.find({ product: req.params.id })
          .populate("reviews.user")
          .exec((err, reviewsDoc) => {
            if (!reviewsDoc) {
              return res.json({ reviews: [], rating: 0 });
            }
            let totalRating = 0;
            let totalReviews = 0;
            // averageRating = averageRating.toFixed(2);
            let reducedInfo = reviewsDoc[0].reviews.map(review => {
              totalRating += review.rating;
              totalReviews++;
              return {
                id: review._id,
                author: {
                  id: review.user._id,
                  fullName:
                    review.user[review.user.method].firstName +
                    " " +
                    review.user[review.user.method].lastName
                },
                message: review.message,
                rating: review.rating,
                date: review.date
              };
            });
            let averageRating = totalRating / totalReviews;
            averageRating = averageRating.toFixed(2);
            reducedInfo = reducedInfo.reverse();
            res.json({ reviews: reducedInfo, rating: averageRating });
          });
        ///////////////
      }
    });
  }
};
