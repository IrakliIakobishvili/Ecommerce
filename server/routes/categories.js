const router = require("express-promise-router")();
const passport = require("passport");
const passportJWT_Admin = passport.authenticate("admin-rule", {
  session: false
});
const CategoryController = require("../controllers/categories");
const { validateBody, schemas } = require("../helpers/routeHelpers");

router
  .route("/")
  .get(CategoryController.findAll)
  .post(
    passportJWT_Admin,
    validateBody(schemas.categorySchema),
    CategoryController.create
  );

router
  .route("/:id")
  .get(CategoryController.findByCatId)
  .put(passportJWT_Admin, CategoryController.update)
  .delete(passportJWT_Admin, CategoryController.remove);

module.exports = router;

//getWithProducts
