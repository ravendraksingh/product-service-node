const express = require("express");
const router = new express.Router();
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const validateBody = require("./validators/validateBody");
const categorySchema = require("./validators/categorySchema");
const validateQueryParams = require("./validators/validateQueryParams");
const categoryIdSchema = require("./validators/categoryIdSchema");
const categoryNameSchema = require("./validators/categoryNameSchema");

router.get(`/api/ecom/v1/products`, ProductController.getAllProducts);
router.put(`/api/ecom/v1/products`, ProductController.updateProduct);
router.get(`/api/ecom/v1/products/:sku`, ProductController.getProductBySKU);
router.get(
  `/api/ecom/v1/products/search/:searchstr`,
  ProductController.searchProducts
);

router.post(
  `/api/ecom/v1/categories`,
  validateBody(categorySchema),
  CategoryController.addCategory
);
router.get(
  `/api/ecom/v1/categories/search`,
  validateQueryParams(categoryIdSchema, categoryNameSchema),
  CategoryController.search
);
router.put(`/api/ecom/v1/categories`, CategoryController.updateCategory);

router.get("/health", (req, res) => {
  res.status(200).json({ "status" : "Ok"});
});

module.exports = router;
