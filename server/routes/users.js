const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFB = passport.authenticate("facebookToken", { session: false });
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

router
  .route("/signup")
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.loginSchema),
    passportSignIn,
    UsersController.signIn
  );

router.route("/oauth/google").post(passportGoogle, UsersController.googleOAuth);
router.route("/oauth/facebook").post(passportFB, UsersController.facebookOAuth);

router.route("/").get(passportJWT_Admin, UsersController.findAll);
router.route("/secret").get(passportJWT_User, UsersController.secret);

module.exports = router;
