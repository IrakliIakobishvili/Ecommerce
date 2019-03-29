const router = require("express-promise-router")();
const ProductController = require("../controllers/products");
const passport = require("passport");
const passportConf = require("../passport");
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});

const { validateBody, schemas } = require("../helpers/routeHelpers");
const { multer } = require("../helpers/routeHelpers");

router
  .route("/")
  .get(ProductController.findAll)
  .post(passportJWT_Admin, multer("image"), ProductController.create);
router
  .route("/:id")
  .get(ProductController.findById)
  .put(passportJWT_Admin, ProductController.update)
  .delete(passportJWT_Admin, ProductController.remove);
router.route("/search/:title").get(ProductController.findByTitle);
router.route("/filter/").post(ProductController.findByFilter);
router.route("/category/:id").get(ProductController.findByCat);

module.exports = router;
