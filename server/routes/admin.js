const router = require("express-promise-router")();
const passport = require("passport");
// const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const AdminController = require("../controllers/admin");
// const ProductController = require("../controllers/products");
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

router.route("/").get(passportJWT_Admin, AdminController.profile);
// router.route("/profile").get(passportJWT_User, UsersController.profile);

module.exports = router;
