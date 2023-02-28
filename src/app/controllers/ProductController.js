const Product = require("../models/Product");
const session = require("express-session");

const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

class ProductController {
    index(req,res,next){
        res.render("products/allProduct");
    }
}

module.exports = new ProductController();

