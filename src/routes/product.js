const productController = require("../app/controllers/ProductController");
const express = require("express");
const router = express.Router();

router.get("/",productController.index)

module.exports = router;