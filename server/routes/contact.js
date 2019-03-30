const router = require("express-promise-router")();
const ContactController = require("../controllers/contact");

router
  .route("/")
  .post(ContactController.create)
  .get(ContactController.findAll);
module.exports = router;
