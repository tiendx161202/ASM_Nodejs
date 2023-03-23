const Category = require("../models/Category")
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

    if (product_cart.product_stock < number_quanity) {
      req.flash('err', `Số lượng trong cửa hàng còn : ${product_cart.product_stock} KG`);
      return res.redirect("/san-pham");
      //  return res.render("products/allProduct", {
      //   error_quanity: `Số lượng trong cửa hàng còn : ${product_cart.product_stock} KG`,
      // });
    }
    if (!cartFound) {
      let products = [];
      let productIncart = {
        product_id: product_cart._id,
        name: product_cart.product_name,
        quanity: number_quanity,
        unit_price: product_cart.product_price,
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
      product_cart.product_stock -= number_quanity;
      product_cart.save();
      Cart.insertMany(cart);
    } else {
      // console.log(_id);
      let tontai = false;
      cartFound.products.forEach(function (p) {
        if (_id == p.product_id) {
          tontai = true;
          p.quanity += number_quanity;
        }
      });
      product_cart.product_stock -= number_quanity;
      product_cart.save();

      if (!tontai) {
        let productIncart = {
          product_id: product_cart._id,
          name: product_cart.product_name,
          quanity: number_quanity,
          unit_price: product_cart.product_price,
          // total_price: product_cart.product_price * number_quanity,
          img: product_cart.product_img,
        };
        // product_cart.product_stock -= number_quanity;
        // product_cart.save();
        cartFound.products.push(productIncart);
      }
      cartFound.save();
    }
    return res.redirect("/san-pham");
    // return res.render("products/allProduct");
  }

  // [GET] /san-pham/getCategory/:id
  async getCategory(req, res) {
    const category = await Category.find({});
    const productCategory = await Product.find({category_id: req.params.id});
    return res.render("products/productofcategory",{
      categories : multipleMongooseToObject(category),
      products:multipleMongooseToObject(productCategory),
    })
  }
}

module.exports = new ProductController();
