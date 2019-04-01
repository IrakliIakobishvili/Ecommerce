const router = require("express-promise-router")();
const passport = require("passport");
const ChatController = require("../controllers/chat");
const passportJWT_User = passport.authenticate("user-rule", { session: false });
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

router.route("/").post(passportJWT_User, ChatController.sendToAdmin);
router.route("/answer").post(passportJWT_User, ChatController.answerFromAdmin);
router.route("/user").get(passportJWT_User, ChatController.userMessages);
router.route("/admin").get(passportJWT_Admin, ChatController.adminMessages);
module.exports = router;
