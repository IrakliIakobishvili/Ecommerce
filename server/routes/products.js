const router = require("express-promise-router")();
const ProductController = require("../controllers/products");
// const { validateBody, schemas } = require("../helpers/routeHelpers");

const { validateBody, schemas } = require("../helpers/routeHelpers"); //productSchema

router
  .route("/")
  .get(ProductController.findAll)
  .post(validateBody(schemas.productSchema), ProductController.create);

//.post(validateBody(schemas.productSchema), ProductController.create);
router
  .route("/:id")
  .get(ProductController.findById)
  .put(ProductController.update)
  .delete(ProductController.remove);

module.exports = router;
