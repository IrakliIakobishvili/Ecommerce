const router = require("express-promise-router")();
const passport = require("passport");
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const ReviewController = require("../controllers/reviews");

router.route("/").post(passportJWT_User, ReviewController.addReview);
//   .get(passportJWT_User, OrderController.getCartItems)
//   .put(passportJWT_User, OrderController.removeItemFromCart)
//   .delete(passportJWT_User, OrderController.emptyCart);
router.route("/:id").get(passportJWT_User, ReviewController.getReviews);
module.exports = router;
