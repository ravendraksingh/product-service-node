const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");
const validatePathParams = require("../validators/validatePathParams");
const categoryIdSchema = require("../validators/categoryIdSchema");
const CategoryJson = require("../controllers/CategoryJson");
const { getFromDynamo } = require("../db/dynamo");

// router.get("/v1/categories", CategoryJson.getAllCategories);
// router.get("/v1/categories/:id", CategoryJson.getCategoryById);
router.get("/v1/categories", CategoryController.getAllCategories);
// router.get("/v1/categories/:id",validatePathParams(categoryIdSchema),CategoryController.getCategoryById);

router.post("/v1/categories", CategoryController.addCategory);
router.delete("/v1/categories/:id", CategoryController.deleteCategoryById);

router.get(`/v1/products`, ProductController.getAllProducts);
router.put(`/v1/products`, ProductController.updateProduct);
router.get(`/v1/products/:id`, ProductController.getProductById);
router.get(
  `/api/ecom/v1/products/search/:sku`,
  ProductController.getProductBySKU
);

router.get("/v2/products", getFromDynamo);

module.exports = router;
