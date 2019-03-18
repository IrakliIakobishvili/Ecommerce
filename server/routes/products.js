const router = require("express-promise-router")();
const ProductController = require("../controllers/products");

const { validateBody, schemas } = require("../helpers/routeHelpers");

router
  .route("/")
  .get(ProductController.findAll)
  .post(validateBody(schemas.productSchema), ProductController.create);
router
  .route("/:id")
  .get(ProductController.findById)
  .put(ProductController.update)
  .delete(ProductController.remove);

router.route("/category/:id").get(ProductController.findByCat);

module.exports = router;
