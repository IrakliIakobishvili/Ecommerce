const router = require("express-promise-router")();
const passport = require("passport");
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const CartController = require("../controllers/cart");

router
  .route("/")
  .post(passportJWT_User, CartController.addItemToCart)
  .get(passportJWT_User, CartController.getCartItems)
  .put(passportJWT_User, CartController.removeItemFromCart)
  .delete(passportJWT_User, CartController.emptyCart);

module.exports = router;
