const productController = require("../app/controllers/ProductController");
const express = require("express");
const router = express.Router();
const checkLogin = require("../app/middlewares/checkLoginSessionMiddleware");



router.post("/", checkLogin ,productController.addProductToCart);
router.get("/detail-product/:product_name", productController.detailProduct);
router.get("/", productController.index);

module.exports = router;
