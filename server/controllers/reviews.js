const Review = require("../models/review");
// const User = require("../models/user");
// const Product = require("../models/product");

module.exports = {
  addReview: (req, res) => {
    const user = req.user.id;
    const { productID, message, rating } = req.body;
    console.log(req.body);
    const review = {
      user: user,
      message: message,
      rating: rating
    };
    // const product = req.body.productID;
    // const review = {
    //   message: req.body.product,
    //   quantity: req.body.quantity
    // };
    ///////////// Start//////////////
    // const getCartItems = id => {
    //   Cart.findOne({ user: id })
    //     .populate("items.product")
    //     .exec((err, cart) => {
    //       if (!cart) {
    //         return res.json({ items: [] });
    //       }
    //       res.send(cart);
    //     });
    // };
    ///////////// End /////////////
    Review.findOne({ product: productID }).then(foundReview => {
      if (foundReview) {
        foundReview.reviews.push(review);
        foundReview.save().then(() => res.status(200).json("Review Added"));
        // getCartItems(req.user.id)
        // let message = foundReview.items.map(item => item.product + "");
        // if (foundReview.reviews.includes(item.product)) {
        //   Cart.findOneAndUpdate(
        //     {
        //       user: user,
        //       items: {
        //         $elemMatch: { product: item.product }
        //       }
        //     },
        //     {
        //       $inc: { "items.$.quantity": item.quantity }
        //     }
        //   )
        //     .exec()
        //     .then(() => res.status(200).json("Quantity Increased"));
        //   // getCartItems(req.user.id);
        // } else {
        //   foundCart.items.push(item);
        //   foundCart.save().then(
        //     () => res.status(200).json("Item Added")
        //     // getCartItems(req.user.id)
        //   );
        // }
      } else {
        Review.create({
          product: productID,
          reviews: [review]
        }).then(
          () => res.status(200).json("Review Created")
          // getCartItems(req.user.id)
        );
      }
    });
  },
  getReviews: async (req, res) => {
    // Review.find({ product: req.params.id })
    //   .populate("reviews.user")
    //   .exec((err, reviewsDoc) => {
    //     if (!reviewsDoc) {
    //       // console.log("reviewsDoc");
    //       // console.log(reviewsDoc);
    //       return res.json([]); // change with []
    //       // return res.end();
    //     }
    //     // console.log("arsebobs");
    //     const reducedInfo = reviewsDoc[0].reviews.map(review => {
    //       // let method = review.user.method;
    //       return {
    //         id: review._id,
    //         author: {
    //           id: review.user._id,
    //           fullName:
    //             review.user[review.user.method].firstName +
    //             " " +
    //             review.user[review.user.method].lastName
    //         },
    //         message: review.message
    //       };
    //     });
    //     res.json(reducedInfo);
    //     // res.json("ki");
    //   });
    // const reviewDoc = await Review.findOne({ product: req.params.id }).populate(
    //   "reviews.user"
    // );
    // if (reviewDoc) {
    //   return res.json("arsebobs");
    // } else {
    //   return res.json("ar arsebobs");
    // }

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
            const reducedInfo = reviewsDoc[0].reviews.map(review => {
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
                rating: review.rating
              };
            });
            // console.log("totalRating ", totalRating);
            // console.log("totalReviews ", totalReviews);
            // averageRating = totalRating / totalReviews;
            // console.log(averageRating);
            // if (typeof totalReviews === "number") {
            //   console.log("totalReviews is number");
            // }
            let averageRating = totalRating / totalReviews;
            averageRating = averageRating.toFixed(2);
            res.json({ reviews: reducedInfo, rating: averageRating });
          });
        ///////////////
      }
    });
    // const reviewDoc = await Review.find({ product: req.params.id });
    // if (reviewDoc) {
    //   console.log(reviewDoc[0].reviews);
    //   const reviews = reviewDoc.reviews;
    //   res.status(200).send(reviews);
    // }
  }
  // getReviews: (req, res) => {
  //   Review.findOne({ product: req.body.productID })
  //     .populate("reviews.product")
  //     .exec((err, cart) => {
  //       if (!cart) {
  //         return res.json({ items: [] });
  //       }
  //       res.send(cart);
  //     });
  // }
  //   removeItemFromCart: (req, res) => {
  //     Cart.findOne({ user: req.user.id }).then(foundCart => {
  //       if (foundCart) {
  //         foundCart.items = foundCart.items.filter(
  //           item => item._id != req.body.itemId
  //         );
  //         foundCart.save(() =>
  //           res
  //             .status(200)
  //             .json({ message: "Item Removed", data: foundCart.items })
  //         );
  //       }
  //     });
  //   },
  //   emptyCart: (req, res) => {
  //     Cart.findOne({ user: req.user.id }).then(foundCart => {
  //       Cart.findByIdAndRemove(foundCart._id)
  //         .then(() => res.status(200).json("Empty Cart"))
  //         .catch(err => res.send(err));
  //     });
  //   }
};
