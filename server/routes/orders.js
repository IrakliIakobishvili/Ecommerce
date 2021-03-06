const router = require("express-promise-router")();
const passport = require("passport");
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const OrderController = require("../controllers/orders");

router
  .route("/")
  .post(passportJWT_User, OrderController.saveOrder)
  .get(passportJWT_User, OrderController.getOrder);

module.exports = router;
