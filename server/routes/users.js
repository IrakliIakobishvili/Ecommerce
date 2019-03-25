const router = require("express-promise-router")();
const passport = require("passport");
const JWT = require("jsonwebtoken");
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
// const { sendMail } = require("../nodemailer");
const { JWT_SECRET } = require("../configuration");

// Used Two Times! (users controller)
signToken = user => {
  return JWT.sign(
    {
      iss: "Ecommerce",
      sub: user.id,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // Expires in 60 minutes
    },
    JWT_SECRET
  );
};

///////////////
function passportSignInChecker(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json("Email or Password is wrong!");
    } else if (!user.local.verified) {
      return res.status(401).json("Unverified Account!");
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}
///////////////

router
  .route("/signup")
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.loginSchema),
    passportSignInChecker,
    UsersController.signIn
  );

router.route("/oauth/google").post(passportGoogle, UsersController.googleOAuth);
router.route("/oauth/facebook").post(passportFB, UsersController.facebookOAuth);

router
  .route("/:id")
  .get(passportJWT_Admin, UsersController.findById)
  .put(passportJWT_Admin, UsersController.update)
  .delete(passportJWT_Admin, UsersController.remove);
router.route("/").get(passportJWT_Admin, UsersController.findAll);
router.route("/page/profile").get(passportJWT_User, UsersController.profile);

router.route("/verify/:token").get(UsersController.verify);
router.route("/recover").get(UsersController.recover);

module.exports = router;
