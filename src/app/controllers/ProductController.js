const Category = require("../models/Categorie");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");

const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

class ProductController {
  // [GET] /san-pham
  async index(req, res, next) {
    const product = await Product.find({});
    const categori = await Category.find({});
    res.render("products/allProduct", {
      products: multipleMongooseToObject(product),
      categories: multipleMongooseToObject(categori),
    });
  }

  // [GET] /san-pham/detail-product/:product_name
  async detailProduct(req, res, next) {
    const nameProduct = await Product.findOne({
      product_name: req.params.product_name,
    });
    if (!nameProduct) {
      return res.redirect("/san-pham");
    }
    res.render("products/detailproduct", {
      products: mongooseToObject(nameProduct),
    });
  }

  // [POST] /san-pham/allproduct (_id , quanity)
  async addProductToCart(req, res, next) {
    const quanity = req.body.quanity;
    const _id = req.body._id;
    let number_quanity = Number(quanity);

    if (!number_quanity || isNaN(number_quanity)) {
      res.json("Số lượng không đúng");
    }
    const product_cart = await Product.findById(_id);
    const user_cart = await User.findById(req.session.User._id);
    const cartFound = await Cart.findOne({
      "user.user_id": req.session.User._id,
      status_cart: "Chưa Thanh Toán",
    });

    if (!cartFound) {
      let products = [];
      let productIncart = {
        product_id: product_cart._id,
        name: product_cart.product_name,
        quanity: number_quanity,
        unit_price: product_cart.product_price,
        // total_price: product_cart.product_price * number_quanity,
        img: product_cart.product_img,
      };
      products.push(productIncart);

      let cart = {
        user: {
          user_id: user_cart._id,
          username: user_cart.username,
          address: user_cart.address,
          numberphone: user_cart.numberphone,
        },
        products: products,
        status_cart: "Chưa Thanh Toán",
      };

      // let total_price_cart = 0;

      // productIncart.forEach(function(p){
      //   total_price_cart += p.quanity*unit_price;
      // })

      Cart.insertMany(cart);
      console.log(cart);
    } 
    else{
      let quanityDB = product_cart.quanity;
      let quanityNew = number_quanity + quanityDB;
      let productIncart = {
        product_id: product_cart._id,
        name: product_cart.product_name,
        quanity: quanityNew,
        unit_price: product_cart.product_price,
        // total_price: product_cart.product_price * number_quanity,
        img: product_cart.product_img,
      };

      cartFound.products.push(productIncart);
      cartFound.save();
    }
    return res.redirect("/san-pham")
  }
}

module.exports = new ProductController();
