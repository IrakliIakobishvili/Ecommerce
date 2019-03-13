// const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFB = passport.authenticate("facebookToken", { session: false });
// const passportJWT = passport.authenticate("jwt", { session: false });
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

router
  .route("/signup")
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

// Custom Error For Unauthorized User
// router.route("/signin").post(
//   validateBody(schemas.loginSchema),
//   function(req, res, next) {
//     passport.authenticate("local", function(err, user, info) {
//       if (err) return next(err);
//       if (!user) {
//         return res.status(401).json({ status: "error", code: "unauthorized" });
//       } else {
//         return res.json({
//           token: JWT.sign(
//             {
//               iss: "Ecommerce",
//               sub: user.id,
//               iat: new Date().getTime(),
//               exp: Math.floor(Date.now() / 1000) + 60 * 60 // Expires in 60 minutes
//             },
//             JWT_SECRET
//           )
//         });
//       }
//     })(req, res, next);
//   },
//   UsersController.signIn
// );

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
