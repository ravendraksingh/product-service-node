const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");
const validatePathParams = require("../validators/validatePathParams");
const categoryIdSchema = require("../validators/categoryIdSchema");

router.get("/api/ecom/v1/categories", CategoryController.getAllCategories);
router.get(
  "/api/ecom/v1/categories/:id",
  validatePathParams(categoryIdSchema),
  CategoryController.getCategoryById
);
router.post("/api/ecom/v1/categories", CategoryController.addCategory);
router.delete(
  "/api/ecom/v1/categories/:id",
  CategoryController.deleteCategoryById
);

router.get(`/api/ecom/v1/products`, ProductController.getAllProducts);
router.put(`/api/ecom/v1/products`, ProductController.updateProduct);
router.get(`/api/ecom/v1/products/:id`, ProductController.getProductById);
router.get(
  `/api/ecom/v1/products/search/:searchstr`,
  ProductController.searchProducts
);

module.exports = router;
