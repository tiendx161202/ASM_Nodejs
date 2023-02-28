const Product = require("../models/Product");
const session = require("express-session");

const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

class ProductController {
  async index(req, res, next) {
    Product.find({}).then(function (product) {
      if (!product) {
        return res.status(400).json({ error: "message" });
      }
      res.render("products/allProduct", {
        products: multipleMongooseToObject(product),
      });
    });
  }
}

module.exports = new ProductController();
