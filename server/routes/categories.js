const router = require("express-promise-router")();
const CategoryController = require("../controllers/categories");

const { validateBody, schemas } = require("../helpers/routeHelpers");

router
  .route("/")
  .get(CategoryController.findAll)
  .post(validateBody(schemas.categorySchema), CategoryController.create);

router
  .route("/:id")
  .get(CategoryController.findByCatId)
  .put(CategoryController.update)
  .delete(CategoryController.remove);

module.exports = router;

//getWithProducts
