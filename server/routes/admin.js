const router = require("express-promise-router")();
const passport = require("passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const AdminController = require("../controllers/admin");
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

router.route("/").post(passportJWT_Admin, AdminController.profile);

module.exports = router;
