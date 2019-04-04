const router = require("express-promise-router")();
const passport = require("passport");
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const ReviewController = require("../controllers/reviews");

router.route("/").post(passportJWT_User, ReviewController.addReview);
router.route("/:id").get(ReviewController.getReviews);
module.exports = router;
