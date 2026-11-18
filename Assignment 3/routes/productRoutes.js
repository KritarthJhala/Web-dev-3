const express = require("express");
const c = require("../controllers/productController");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

// Static routes must come before "/:id"
router.get("/low-stock", c.getLowStock);
router.get("/summary", c.getSummary);

router.route("/").get(c.getProducts).post(c.createProduct);

router.patch("/:id/stock", validateObjectId, c.adjustStock);

router
  .route("/:id")
  .all(validateObjectId)
  .get(c.getProductById)
  .put(c.updateProduct)
  .delete(c.deleteProduct);

module.exports = router;
